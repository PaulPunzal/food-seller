const supabase = require('../config/db');

async function findAll({ search, status } = {}) {
  let query = supabase
    .from('customers')
    .select('*')
    .order('name', { ascending: true });

  if (status) query = query.eq('status', status);
  if (search) query = query.ilike('name', `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function findById(id) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

async function create(fields) {
  const { data, error } = await supabase
    .from('customers')
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function update(id, fields) {
  const { data, error } = await supabase
    .from('customers')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function remove(id) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

module.exports = { findAll, findById, create, update, remove };