const supabase = require('../config/db');

/**
 * Fetch all menu items, newest first.
 */
async function findAll() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Fetch a single menu item by ID.
 */
async function findById(id) {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Create a new menu item.
 * @param {object} fields - validated fields from menuItemSchema
 */
async function create(fields) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Update a menu item by ID.
 * @param {string} id
 * @param {object} fields - partial update fields
 */
async function update(id, fields) {
  const { data, error } = await supabase
    .from('menu_items')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Delete a menu item by ID.
 */
async function remove(id) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = { findAll, findById, create, update, remove };