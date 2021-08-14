const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

console.log(`Router is loaded`);

module.exports = router;