var express = require('express');
const Login = require('../controllers/login');
var router = express.Router();
const userRouter=require('./users')
const cartRouter=require('./cart');
const JwtVerification = require('../utilitis/jwtverification');

/* GET home page. */
router.use('/',   userRouter)
router.post('/signin', Login.login)
router.post("/registr", Login.register);
router.use('/cart', JwtVerification, cartRouter)


module.exports = router;
