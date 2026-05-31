// backend/src/routes/customer.routes.js
// Replace the existing file with this one after adding the controller.
const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  list, getOne, create, update, remove,
} = require('../controllers/customer.controller');

const router = Router();
router.use(requireAuth);

router.get('/',       list);
router.post('/',      create);
router.get('/:id',    getOne);
router.put('/:id',    update);
router.delete('/:id', remove);

module.exports = router;