const express = require('express');
const router = express.Router();
const login = require('../controller/users/login');
const reg = require('../controller/users/register');
const user = require('../controller/users/user');
const category = require('../controller/livestock/category');
const livestock = require('../controller/livestock/livestock');
const breed = require('../controller/livestock/breed');
const rating =  require('../controller/rate/rating');
const transaction = require('../controller/transaction/transaction')


//routes for login and registering
router.post('/users/login', login.login)
router.post('/users/register', reg.register)

//routes for users
router.get('/users/getUsers', user.getUsers)
router.post('/users/createUsers', user.postUsers)
router.put('/users/updateUsers/:id', user.updateUser)
router.delete('/users/deleteUser/:id', user.deleteUser)

//routes for category
router.get('/category/getCategory', category.getCategory)
router.post('/category/createCategory', category.postCategory)
router.put('/category/updateCategory', category.updateCategory)

//routes for livestock
router.get('/livestock/getLivestock', livestock.getLivestock)
router.get('/livestock/getPostedLivestock', livestock.getPostedLivestock)
router.get('/livestock/getPostedLivestockByUser', livestock.getPostedLivestockByUser)
router.post('/livestock/createLivestock', livestock.postLivestock)
router.put('/livestock/updateLivestock/:id', livestock.updateLivestock)


//routes for breed
router.post('/breed/createBreed', breed.postBreed)
router.put('/breed/updateBreed/:id' , breed.updateBreed)
router.delete('/breed/deleteBreed/:id', breed.removeBreed)
router.get('/breed/getAllBreed',breed.breed)
router.get('/breed/getOnebreed/:id', breed.getBreedById)

//routes for rating 
router.post('/rate/createRate',rating.createRating)
router.get('/rate/getRatings',rating.getRating)
router.get('/rate/getRatingPerUser/:id', rating.getRatingPerUser)

//routes for transaction
router.post('/transaction/createTransaction', transaction.createTransaction)
router.put('/transaction/updateTransaction/:id' , transaction.updateTransaction)
router.get('/transaction/getAllTransaction',transaction.getTransaction)
router.get('/transaction/getFullTransaction',transaction.getFullTransaction)

module.exports = router;  