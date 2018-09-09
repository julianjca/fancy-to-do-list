const router = require('express').Router();
const { addUser,displayUser } = require('../controller/userController');
const { addTask,deleteTask,updateTask } = require('../controller/todoController');


//User
router.post('/register',addUser);
router.post('/login',displayUser);

// To-do
router.post('/todo',addTask);
router.delete('/todo/:id',deleteTask);
router.put('/todo/:id',updateTask);

module.exports = router;