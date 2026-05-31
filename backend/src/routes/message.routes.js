const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');

const router = Router();
router.use(requireAuth);

// GET  /api/messages/sent-log           — list sent message log
router.get('/sent-log', (_req, res) => res.json({ message: 'TODO: list sent log' }));

// POST /api/messages/sent-log           — mark message(s) as sent
router.post('/sent-log', (_req, res) =>
  res.status(201).json({ message: 'TODO: log sent message' })
);

// POST /api/messages/generate-caption   — AI caption generation placeholder
router.post('/generate-caption', (_req, res) =>
  res.json({ message: 'TODO: generate caption' })
);

module.exports = router;