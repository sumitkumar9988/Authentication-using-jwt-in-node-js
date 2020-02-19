const express = require('express');
const userController = require('./../userControler/userController');

const router = express.Router();

router.route('/').post(userController.signup);

module.exports = router;
