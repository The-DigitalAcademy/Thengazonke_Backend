const express = require('express');
const router = express.Router();
const login = require('../controller/users/login');
const reg = require('../controller/users/register');
const user = require('../controller/users/user');

//routes for login and registering
router.post('/users/login', login.login)
router.post('/users/register', reg.register)

//routes for users
router.get('/users/getUsers', user.getUsers)

module.exports = router;  