import rateLimit from "express-rate-limit";

/**
 * 1. Global Rate Limiter:
 * Restricts an IP address to 150 requests every 15 minutes.
 * Shields the entire server against Denial-of-Service (DoS) and web scraping bots.
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 150, // limit each IP address
  standardHeaders: true, // Return standard RateLimit headers
  legacyHeaders: false, // Disable old X-RateLimit headers
  message: {
    success: false,
    error: "Security Alert: Too many requests from this IP address. Please wait 15 minutes before making additional requests."
  }
});

/**
 * 2. Strict Submission Rate Limiter:
 * Restricts an IP address to 15 form submissions every 15 minutes.
 * Prevents automated form spamming, database flooding, and inbox attacks.
 */
export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Security Alert: High frequency submission detected. Please wait 15 minutes before sending another transmission."
  }
});

/**
 * 3. AI Generation Rate Limiter:
 * Restricts AI prompt requests to 10 per 15 minutes.
 * Protects server API quotas and prevents expensive compute resource exhaustion.
 */
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Security Alert: AI generation request limit reached. Please wait 15 minutes before generating additional content."
  }
});

