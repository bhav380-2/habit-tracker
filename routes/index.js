const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');


router.get('/',UserController.welcomePage);

router.post('/save-username',UserController.saveUsername);

router.use('/habits',require('./habits'));

module.exports = router;

