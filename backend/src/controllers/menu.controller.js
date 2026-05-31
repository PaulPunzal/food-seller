const menuModel = require('../model/menu.model');
const cloudinary = require('../config/cloudinary');

/** GET /api/menus */
async function list(req, res, next) {
  try {
    const items = await menuModel.findAll();
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

/** GET /api/menus/:id */
async function getOne(req, res, next) {
  try {
    const item = await menuModel.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

/** POST /api/menus */
async function create(req, res, next) {
  try {
    const fields = {
      ...req.body,
      image_url: req.file?.path ?? null,
      image_public_id: req.file?.filename ?? null,
    };
    const item = await menuModel.create(fields);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/menus/:id */
async function update(req, res, next) {
  try {
    const existing = await menuModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Menu item not found' });

    const fields = { ...req.body };

    if (req.file) {
      // Delete old Cloudinary image if present
      if (existing.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id).catch(() => {});
      }
      fields.image_url = req.file.path;
      fields.image_public_id = req.file.filename;
    }

    const item = await menuModel.update(req.params.id, fields);
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/menus/:id */
async function remove(req, res, next) {
  try {
    const existing = await menuModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Menu item not found' });

    if (existing.image_public_id) {
      await cloudinary.uploader.destroy(existing.image_public_id).catch(() => {});
    }

    await menuModel.remove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };