const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`[server] Health check: http://localhost:${PORT}/health`);
});