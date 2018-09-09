const router = require('express').Router();
const { addUser,displayUser,fbLogin } = require('../controller/userController');


//User
router.post('/register',addUser);
router.post('/login',displayUser);
router.post('/fb-login',fbLogin);

module.exports = router;