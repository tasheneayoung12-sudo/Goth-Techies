/**
 * Centralized error handling middleware.
 * Catches unhandled server errors and returns a structured JSON error response.
 */
export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack || err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || "An unexpected internal server error occurred.",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};
