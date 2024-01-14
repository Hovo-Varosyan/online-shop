var express = require('express');
const Cart = require('../controllers/cart');
var router = express.Router();

router.post('/add',  Cart.add)
router.delete('/delete', Cart.delete)
router.put('/count', Cart.count)


module.exports=router