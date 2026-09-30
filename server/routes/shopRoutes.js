const express = require('express');
const { getNearbyShops } = require('../controllers/shopController');

const router = express.Router();
router.get('/nearby', getNearbyShops);

module.exports = router;
