const customerModel = require('../model/customer.model');
const { customerSchema, validate } = require('../utils/validators');

/** GET /api/customers */
async function list(req, res, next) {
  try {
    const { search, status } = req.query;
    const customers = await customerModel.findAll({ search, status });
    res.json({ customers });
  } catch (err) {
    next(err);
  }
}

/** GET /api/customers/:id */
async function getOne(req, res, next) {
  try {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json({ customer });
  } catch (err) {
    next(err);
  }
}

/** POST /api/customers */
async function create(req, res, next) {
  try {
    const result = customerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
      });
    }
    const customer = await customerModel.create(result.data);
    res.status(201).json({ customer });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/customers/:id */
async function update(req, res, next) {
  try {
    const existing = await customerModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Customer not found' });

    const customer = await customerModel.update(req.params.id, req.body);
    res.json({ customer });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/customers/:id */
async function remove(req, res, next) {
  try {
    const existing = await customerModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Customer not found' });

    await customerModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };