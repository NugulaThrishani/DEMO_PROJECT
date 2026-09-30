const mongoose = require('mongoose');

const pastrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    prepTime: { type: String, default: '15 min' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pastry', pastrySchema);
