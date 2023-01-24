const express = require('express');
const router = express.Router();
const login = require('../controller/users/login');
const reg = require('../controller/users/register');
const user = require('../controller/users/user');
const category = require('../controller/livestock/category');

//routes for login and registering
router.post('/users/login', login.login)
router.post('/users/register', reg.register)

//routes for users
router.get('/users/getUsers', user.getUsers)
router.post('/users/createUsers', user.postUsers)

//routes for category
// router.get('/category/getCategory', category.postCategory)
router.post('/category/createCategory', category.postCategory)

module.exports = router;  