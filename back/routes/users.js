var express = require('express');
const JwtVerification = require('../utilitis/jwtverification');
const Home = require('../controllers/home');
const User = require('../controllers/user');
const Login = require('../controllers/login');
var router = express.Router();

/* GET users listing. */
router.get('/', JwtVerification, Home.homrout);
router.get('/user',JwtVerification, User.user);
router.post('/logout',JwtVerification, Login.logout)

module.exports = router;
