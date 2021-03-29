const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxyController');

router.post('/currencyConverter(*)', proxyController.getCurrency);
router.post('*', proxyController.getCurrency);

module.exports = router;