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
  },

  deleteTask : function(req,res){
    Todo.deleteOne({_id: new mongodb.ObjectID(req.params.id)},(err)=>{
      if(!err){
        console.log(`Removed the document with the id a equal to ${req.params.id}`);
        res.status(200).json({
          msg : `success deleting with id : ${req.params.id}`
        });
      }
      else{
        res.status(500).json({
          msg : "failed deleting from database"
        });
      }
    });
  },

  updateTask : function(req,res){
    const data = req.body;
    Todo.updateOne({_id: new mongodb.ObjectID(req.params.id)},data,(err)=>{
      if(!err){
        res.status(200).json({
          msg : `Updated the document with the id a equal to ${req.params.id}`,
        });
      }
      else{
        res.status(500).json({
          msg : "failed updating to database"
        });
      }
    });
  }
};