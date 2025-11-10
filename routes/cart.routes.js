const express = require('express')
const router = express.Router()
const { postProductinCart, showCart, deleteCartItem } = require('../controllers/cart.controller')

router.post('/postProductinCart', postProductinCart)
router.get('/showCart', showCart)
router.delete('/deleteItem/:productId', deleteCartItem);
module.exports = router