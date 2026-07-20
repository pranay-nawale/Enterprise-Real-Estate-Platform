const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
