const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.use('/habits',require('./habits'));

router.get('/',UserController.welcomePage);
router.post('/save-username',UserController.saveUsername)

module.exports = router;

