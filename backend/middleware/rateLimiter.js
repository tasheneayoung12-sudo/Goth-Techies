import rateLimit from "express-rate-limit";

/**
 * Global rate limiter: restricts IP addresses to 100 requests every 15 minutes.
 * Helps protect against brute-force and Denial-of-Service (DoS) attacks.
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: "Too many requests from this IP, please try again after 15 minutes."
  }
});

/**
 * Strict submission rate limiter: restricts IP addresses to 10 POST form submissions per 15 minutes.
 * Prevents spam form submissions and database flooding.
 */
export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many submissions from this IP address. Please wait before transmitting again."
  }
});
