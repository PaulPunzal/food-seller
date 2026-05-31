const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');

const router = Router();
router.use(requireAuth);

router.get('/', (_req, res) => res.json({ message: 'TODO: list customers' }));
router.post('/', (_req, res) => res.status(201).json({ message: 'TODO: create customer' }));
router.get('/:id', (_req, res) => res.json({ message: 'TODO: get customer' }));
router.put('/:id', (_req, res) => res.json({ message: 'TODO: update customer' }));
router.delete('/:id', (_req, res) => res.json({ message: 'TODO: delete customer' }));

module.exports = router;