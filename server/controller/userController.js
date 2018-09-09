const User = require('../models/userModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  addUser : function(req,res){
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
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

  displayUser: (req, res) => {
    console.log(req.body);
    User
        .findOne({
            email: req.body.email
        })
        .then(user => {
            let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if(isPasswordValid){
                jwt.sign({
                    email : user.email
                  }, process.env.JWT_SECRET,( err,token )=>{
                    if( err ){
                      res.status( 500 ).json({
                        msg : err.message
                      });
                    }
                    else{
                      console.log(token);
                      res.status( 200 ).json({
                        mesg : 'login success',
                        token : token,
                        email : user.email,
                      });
                    }
                  });

            } else{
                res.status(404).json({
                    message: `Email not found`,
                });
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err.message
            });
        });
},
};