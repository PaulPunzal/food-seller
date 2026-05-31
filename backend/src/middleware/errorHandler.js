/**
 * Central error handler — must be registered last in Express.
 * Catches errors passed via next(err).
 */
function errorHandler(err, req, res, _next) {
  const isDev = process.env.NODE_ENV === 'development';

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large — maximum 5 MB' });
  }

  // Generic
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${new Date().toISOString()}] ${status} ${req.method} ${req.path} —`, message);
  if (isDev && err.stack) console.error(err.stack);

  res.status(status).json({
    error: message,
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = { errorHandler };