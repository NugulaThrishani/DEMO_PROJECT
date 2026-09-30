const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    pastry: { type: mongoose.Schema.Types.ObjectId, ref: 'Pastry', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: { type: [orderItemSchema], required: true, validate: value => value.length > 0 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'confirmed', 'ready'], default: 'confirmed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
