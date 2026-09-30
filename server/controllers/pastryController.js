const Pastry = require('../models/Pastry');

async function getPastries(req, res, next) {
  try {
    const pastries = await Pastry.find().sort({ createdAt: 1 });
    res.json(pastries);
  } catch (error) {
    next(error);
  }
}

module.exports = { getPastries };
