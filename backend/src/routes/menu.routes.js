const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const { uploadMenuImage } = require('../middleware/upload');
const { validate, menuItemSchema } = require('../utils/validators');

const router = Router();

// All menu routes require authentication
router.use(requireAuth);

// GET  /api/menus         — list all menu items
router.get('/', (_req, res) => res.json({ message: 'TODO: list menu items' }));

// POST /api/menus         — create a new menu item (with optional image upload)
router.post('/', uploadMenuImage, validate(menuItemSchema), (_req, res) =>
  res.status(201).json({ message: 'TODO: create menu item' })
);

// GET  /api/menus/:id
router.get('/:id', (_req, res) => res.json({ message: 'TODO: get menu item' }));

// PUT  /api/menus/:id
router.put('/:id', uploadMenuImage, (_req, res) =>
  res.json({ message: 'TODO: update menu item' })
);

// DELETE /api/menus/:id
router.delete('/:id', (_req, res) => res.json({ message: 'TODO: delete menu item' }));

// --- Today's Menu ---
// GET  /api/menus/todays-menu/:date
router.get('/todays-menu/:date', (_req, res) =>
  res.json({ message: "TODO: get today's menu" })
);

// POST /api/menus/todays-menu
router.post('/todays-menu', (_req, res) =>
  res.status(201).json({ message: "TODO: save today's menu" })
);

module.exports = router;