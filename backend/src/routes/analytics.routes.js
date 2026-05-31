const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');

const router = Router();
router.use(requireAuth);

// GET /api/analytics/summary
router.get('/summary', (_req, res) => res.json({ message: 'TODO: analytics summary' }));

// GET /api/analytics/top-foods
router.get('/top-foods', (_req, res) => res.json({ message: 'TODO: top foods' }));

// GET /api/analytics/repeat-customers
router.get('/repeat-customers', (_req, res) =>
  res.json({ message: 'TODO: repeat customers' })
);

// POST /api/analytics/events  — log a custom event (order placed, menu viewed, etc.)
router.post('/events', (_req, res) =>
  res.status(201).json({ message: 'TODO: log analytics event' })
);

module.exports = router;