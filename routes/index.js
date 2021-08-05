const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);

console.log(`Router is loaded`);

module.exports = router;