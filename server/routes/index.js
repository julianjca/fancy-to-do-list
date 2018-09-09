const router = require('express').Router();
const { addUser,displayUser } = require('../controller/userController');
const { addTask } = require('../controller/todoController');


router.post('/register',addUser);
router.post('/login',displayUser);
router.post('/addTask',addTask)


module.exports = router;