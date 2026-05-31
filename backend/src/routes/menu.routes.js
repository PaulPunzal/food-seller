// backend/src/routes/menu.routes.js
// Replace the existing file with this one after adding the controller.
const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const { uploadMenuImage } = require('../middleware/upload');
const { validate, menuItemSchema } = require('../utils/validators');
const {
  list, getOne, create, update, remove,
} = require('../controllers/menu.controller');

const router = Router();
router.use(requireAuth);

router.get('/',     list);
router.post('/',    uploadMenuImage, validate(menuItemSchema), create);
router.get('/:id',  getOne);
router.put('/:id',  uploadMenuImage, update);
router.delete('/:id', remove);

module.exports = router;