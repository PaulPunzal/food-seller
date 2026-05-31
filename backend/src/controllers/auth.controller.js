const bcrypt = require('bcryptjs');
const supabase = require('../config/db');
const { signToken } = require('../utils/jwt');

/**
 * POST /api/auth/login
 * Authenticates the single seller account.
 * Returns a signed JWT on success.
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Fetch the seller row from DB
    const { data: seller, error } = await supabase
      .from('seller')
      .select('id, email, password_hash')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !seller) {
      // Generic message — don't reveal whether email exists
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, seller.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({ id: seller.id, email: seller.email });

    res.json({
      token,
      seller: { id: seller.id, email: seller.email },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me
 * Returns the currently authenticated seller's info.
 * Protected by requireAuth middleware.
 */
async function me(req, res, next) {
  try {
    const { data: seller, error } = await supabase
      .from('seller')
      .select('id, email, created_at')
      .eq('id', req.seller.id)
      .single();

    if (error || !seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json({ seller });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, me };