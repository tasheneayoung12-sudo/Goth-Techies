/**
 * Centralized Security Error Handler Middleware
 * 
 * Ensures that sensitive database structures, internal stack traces, 
 * or internal file paths are NEVER leaked to clients in production responses.
 */
export const errorHandler = (err, req, res, next) => {
  // Always log full detailed error stack internally on the server console
  console.error("🔒 [Internal Server Error Log]:", err.stack || err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Determine if it's a known operational validation error
  let safeErrorMessage = "An unexpected internal server error occurred. Please try again later.";

  if (err.name === "ValidationError") {
    safeErrorMessage = "Invalid input payload provided.";
  } else if (err.name === "CastError") {
    safeErrorMessage = "Resource ID format is invalid.";
  } else if (err.code === 11000) {
    safeErrorMessage = "Duplicate entry detected in database.";
  } else if (err.message && statusCode < 500) {
    // Return explicit client messages for 4xx errors
    safeErrorMessage = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: safeErrorMessage,
    // Stack traces are ONLY exposed in local non-production development environments
    ...(process.env.NODE_ENV !== "production" && { debug_stack: err.stack })
  });
};

