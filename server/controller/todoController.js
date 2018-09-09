const Todo = require('../models/todoModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

module.exports = {
  addTask : function(req,res){
    Todo.create({
      name : req.body.name,
      dueDate : req.body.dueDate
    })
    .then(data=>{
      res.status(201).json({
        data
      });
    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  }
};