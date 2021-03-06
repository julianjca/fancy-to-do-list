const User = require('../models/userModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'qerjaworkspace@gmail.com',
      pass: process.env.GMAIL_PASS
  }
});

module.exports = {
  addUser : function(req,res){
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    })
    .then(data=>{
      const mailOptions = {
        from: '"Todolist"', // sender address
        to: req.body.email, // list of receivers
        subject: `Hello,`, // Subject line
        text: 'Hello world?', // plain text body
        html: `<h1 style="
        border-bottom : 1px black solid;
        ">Welcome To Fancy Todo</h1>
          <h2>${req.body.name}</h2>
          <a href"https://fancy-todo-list-5b99e.firebaseapp.com/">Click Here!</a>
        `
    };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({
            error
          });
        } else {
          res.status(201).json({
            data
          });
        }
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
  fbLogin : function(req,res){
     //*Axios Request
     axios({
      method:'get',
      url:`https://graph.facebook.com/me?fields=id,name,email&&access_token=${req.body.token}`
    })
    .then((response)=> {
      console.log(response.data);
      //*Check if user already in database
      User.findOne({
        email : response.data.email
      },(err,users)=>{
        if(!err){
          console.log(users);
          if(users===null){
            User.create({
              name : response.data.name,
              email : response.data.email,
              fromFB : 1
            }, (err,instance)=>{
              const mailOptions = {
                from: '"Todolist"', // sender address
                to: response.data.email, // list of receivers
                subject: `Hello,`, // Subject line
                text: 'Hello world?', // plain text body
                html: `<h1 style="
                border-bottom : 1px black solid;
                ">Welcome To Fancy Todo</h1>
                  <h2>${response.data.name}</h2>
                  <a href="https://fancy-todo-list-5b99e.firebaseapp.com/">Click Here!</a>
                `
            };
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  res.status(500).json({
                    error
                  });
                } else {
                  res.status(201).json({
                    data
                  });
                }
                });
              if(!err){
                jwt.sign({
                  email : response.data.email,
                  name : response.data.name,
                  _id : instance._id
                }, process.env.JWT_SECRET,( err,token )=>{
                  if( err ){
                    res.status( 500 ).json({
                      msg : err.message
                    });
                  }
                  else{
                    User.findOne({ email: response.data.email }, function (err, data) {
                      if(!err){
                        jwt.sign({
                          email : data.email,
                          name : data.name
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
                              email : data.email,
                              id : data._id
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
              else{
                res.status(500).json({
                  msg : "failed adding data"
                });
              }
            });
          }

          else{
            User.findOne({ email: response.data.email }, function (err, data) {
              console.log(data);
              if(!err){
                jwt.sign({
                  email : data.email,
                  name : data.name
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
                      email : data.email,
                      id : data._id
                    });
                  }
                });
              }
            });
          }
        }

        else{
          res.status(500).json({
            msg : "error connecting to database"
          });
        }
      });

    })
    .catch(err=>{
      console.log('error ey');
      res.send(err);
    });
  },

  findUser: (req, res) => {
    jwt.verify(req.body.token,process.env.JWT_SECRET,(err,decoded)=>{
      if(!err){
        User.findOne({
          email: decoded.email
        })
        .populate('todolist').
        exec(function (error, data) {
          if(!err){
            res.status(200).json({
              data
            });
          }
          else{
            res.status(500).json({
              error
            });
          }

        });
      }

      else{
        res.status(500).json({
          err
        });
      }

    });
  }
};