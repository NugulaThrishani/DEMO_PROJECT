const express = require('express');
const { getPastries } = require('../controllers/pastryController');

const router = express.Router();
router.get('/', getPastries);

module.exports = router;
