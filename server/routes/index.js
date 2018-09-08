const router = require('express').Router();
const { addUser,displayUser } = require('../controller/userController');

router.post('/register',addUser);
router.post('/login',displayUser);


module.exports = router;