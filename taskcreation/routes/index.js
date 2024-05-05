var express = require('express');
const { Signup, login } = require('../Controller/User');
var router = express.Router();

//   Post /Signup
router.post("/signup",Signup);    

// POST /login
router.post("/login",login);


module.exports = router;
