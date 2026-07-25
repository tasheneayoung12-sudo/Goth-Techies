/**
 * Input Validation & Sanitization Middleware
 * 
 * Protects the backend against:
 * 1. Invalid input formats (e.g., malformed email addresses)
 * 2. Cross-Site Scripting (XSS) via script tag injection
 * 3. Excessive payload lengths that could cause memory strain or database buffer overflows
 */

// Helper: Basic Email Format Check
export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  // Standard RFC-compliant email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
};

// Helper: Sanitize Text String (Strips HTML tags & limits length)
export const sanitizeText = (input, maxLength = 2000) => {
  if (typeof input !== "string") return "";
  
  // 1. Strip potentially dangerous HTML / script tags to prevent stored XSS
  const cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "");
  
  // 2. Trim whitespace and enforce length limits
  return cleaned.trim().substring(0, maxLength);
};

/**
 * Middleware: Validate Website Survey Submissions
 */
export const validateSurveyInput = (req, res, next) => {
  const { email, category, title, description } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: A valid email address is required."
    });
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Survey category is required."
    });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Survey title is required."
    });
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Survey description cannot be empty."
    });
  }

  // Sanitize fields before passing to controller
  req.body.email = email.trim().toLowerCase();
  req.body.category = sanitizeText(category, 100);
  req.body.title = sanitizeText(title, 200);
  req.body.description = sanitizeText(description, 2000);

  next();
};

/**
 * Middleware: Validate Secure Message Submissions
 */
export const validateSecureMessageInput = (req, res, next) => {
  const { name, email, protocol_category, category, raw_message_payload, message, coffeeAmount } = req.body || {};

  const senderEmail = email || "";
  if (!senderEmail || !isValidEmail(senderEmail)) {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: A valid sender email address is required."
    });
  }

  const payload = raw_message_payload || message || "";
  if (!payload || typeof payload !== "string" || payload.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Transmission payload cannot be empty."
    });
  }

  // Validate coffee amount if provided
  if (coffeeAmount !== undefined && coffeeAmount !== null && coffeeAmount !== "") {
    const numericAmount = Number(coffeeAmount);
    if (isNaN(numericAmount) || numericAmount < 0 || numericAmount > 1000) {
      return res.status(400).json({
        success: false,
        error: "Security Validation Error: Support amount must be a valid number between $0 and $1000."
      });
    }
  }

  // Sanitize values
  req.body.email = senderEmail.trim().toLowerCase();
  req.body.name = sanitizeText(name || "Anonymous Node", 100);
  req.body.protocol_category = sanitizeText(protocol_category || category || "General Support", 100);
  req.body.raw_message_payload = sanitizeText(payload, 3000);

  next();
};

/**
 * Middleware: Validate Newsletter Subscriptions
 */
export const validateNewsletterInput = (req, res, next) => {
  const { email } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: A valid email address is required to subscribe."
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

/**
 * Middleware: Validate Dream / Suggestion Injections
 */
export const validateDreamInput = (req, res, next) => {
  const { email, title, category, description } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: A valid email address is required."
    });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Suggestion title cannot be empty."
    });
  }

  req.body.email = email.trim().toLowerCase();
  req.body.title = sanitizeText(title, 200);
  req.body.category = sanitizeText(category || "ANIME", 50).toUpperCase();
  if (description) {
    req.body.description = sanitizeText(description, 1000);
  }

  next();
};

/**
 * Middleware: Validate Gemini AI Generation Prompts
 */
export const validateGeminiInput = (req, res, next) => {
  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Security Validation Error: Prompt text is required for AI generation."
    });
  }

  req.body.prompt = sanitizeText(prompt, 4000);
  next();
};
