function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  console.error(err.stack || err.message);
  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
}

module.exports = { notFound, errorHandler };
