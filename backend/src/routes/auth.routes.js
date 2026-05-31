const { Router } = require('express');
const { login, me } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth');
const { validate, loginSchema } = require('../utils/validators');

const router = Router();

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

// GET /api/auth/me — verify token is still valid, refresh seller info
router.get('/me', requireAuth, me);

module.exports = router;