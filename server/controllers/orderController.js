const mongoose = require('mongoose');
const Order = require('../models/Order');
const Pastry = require('../models/Pastry');

async function createOrder(req, res, next) {
  try {
    const { items, total } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error('An order must contain at least one item');
    }

    if (typeof total !== 'number' || total < 0) {
      res.status(400);
      throw new Error('A valid order total is required');
    }

    const pastryIds = items.map(item => item.pastry || item._id);
    if (pastryIds.some(id => !mongoose.isValidObjectId(id))) {
      res.status(400);
      throw new Error('Every order item must reference a valid pastry');
    }

    const pastries = await Pastry.find({ _id: { $in: pastryIds } });
    const pastryMap = new Map(pastries.map(pastry => [pastry.id, pastry]));

    const orderItems = items.map(item => {
      const pastry = pastryMap.get(String(item.pastry || item._id));
      const qty = Number(item.qty);

      if (!pastry || !Number.isInteger(qty) || qty < 1) {
        res.status(400);
        throw new Error('Order contains an invalid pastry or quantity');
      }

      return {
        pastry: pastry._id,
        name: pastry.name,
        price: pastry.price,
        image: pastry.image,
        qty
      };
    });

    const calculatedTotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (Math.abs(calculatedTotal - total) > 0.01) {
      res.status(400);
      throw new Error('Order total does not match its items');
    }

    const order = await Order.create({ items: orderItems, total: calculatedTotal });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder };
