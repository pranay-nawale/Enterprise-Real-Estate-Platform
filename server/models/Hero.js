const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  buttonText: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
