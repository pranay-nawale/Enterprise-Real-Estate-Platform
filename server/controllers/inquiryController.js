const Inquiry = require('../models/Inquiry');

// GET /api/inquiries — return newest first
const getAll = async (req, res) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/inquiries/:id
const getOne = async (req, res) => {
  try {
    const item = await Inquiry.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/inquiries — public (no auth required)
const create = async (req, res) => {
  try {
    const item = new Inquiry(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/inquiries/:id — protected
const deleteOne = async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getOne, create, delete: deleteOne };
