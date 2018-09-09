const router = require('express').Router();
const { addTask,deleteTask,updateTask } = require('../controller/todoController');

// To-do
router.post('/',addTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);

module.exports = router;