const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  price: z.number().positive('Price must be positive'),
  description: z.string().max(500).optional(),
  labels: z.array(z.string()).optional().default([]),
  is_available: z.boolean().optional().default(true),
  // image_url is set by the upload middleware, not validated here
});

const customerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  messenger_username: z.string().max(100).optional(),
  status: z.enum(['active', 'inactive', 'vip']).optional().default('active'),
  notes: z.string().max(1000).optional(),
  favorite_orders: z.array(z.string()).optional().default([]),
});

const todaysMenuSchema = z.object({
  menu_item_ids: z.array(z.string().uuid()).min(1, 'Select at least one item'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD').optional(),
  caption: z.string().max(1000).optional(),
});

/**
 * Middleware factory: validates req.body against a Zod schema.
 * On failure returns 400 with validation errors.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    req.body = result.data; // use the parsed (coerced) data
    next();
  };
}

module.exports = {
  validate,
  loginSchema,
  menuItemSchema,
  customerSchema,
  todaysMenuSchema,
};