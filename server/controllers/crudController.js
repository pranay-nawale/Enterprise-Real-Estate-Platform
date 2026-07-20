const crudController = (Model) => {
  return {
    getAll: async (req, res) => {
      try {
        const items = await Model.find().sort({ createdAt: 1 });
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    getOne: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    create: async (req, res) => {
      try {
        const item = new Model(req.body);
        const saved = await item.save();
        res.status(201).json(saved);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },
    update: async (req, res) => {
      try {
        const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        res.json(updated);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    },
    delete: async (req, res) => {
      try {
        const deleted = await Model.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  };
};

module.exports = crudController;
