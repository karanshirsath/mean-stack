const express = require('express'); /// import express

const app = express(); /// executing express app

const bodyParser = require('body-parser');

const User =require('./models/user') // mongoose model import

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://karanShirsath:ZGDIuArMDtzcCcDc@cluster0.3et66.mongodb.net/node-angular?retryWrites=true&w=majority").then((res)=>{
  console.log('connected');
},(err)=>{
  console.log('connection failed');
})

// app.use((req,res,next)=>{ ///middleware
//  console.log('First MiddleWare');
//  next();
// });
app.use(bodyParser.json()); /// to parse json body
app.use((req,res,next)=>{ //// to remove CORS error
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
res.setHeader("Access-Control-Allow-Methods","GET, POST,PUT,PATCH,DELETE,OPTIONS")
 next();
});



app.post('/api/users',(req,res,next)=>{
const user =new User({                //using mongoose model the id will automatically generated
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  gender: req.body.gender,
  description: req.body.description
})
console.log(user);
user.save(); ////// it will automatically saved by mongoose in database
res.status(201).json({
  message:"post added successfully"
});
});

app.delete('/api/users/:id',(req,res,next)=>{
 console.log(req.params.id);
 User.deleteOne({_id:req.params.id}).then((result)=>{
  res.status(200).json({
    message:"User Deleted!"
  })
 })

})
app.put('/api/users/:id',(req,res,next)=>{
  console.log(req.params.id);
  User.updateOne({_id:req.params.id},req.body).then((result)=>{
   res.status(200).json({
     message:"User Updated!"
   })
  })

 })
app.get('/api/users',(req,res,next)=>{
  // const users=[
  //   {
  //     id:"ddhhjbsjs",
  //     firstName:"karan",
  //     lastName:"shirsath",
  //     gender:"male",
  //     description:"Sadfasfasfasfaffs"
  //   },
  //   {
  //     id:"ddhhjbsjzxczxcs",
  //     firstName:"karanzfdf",
  //     lastName:"shirsxzczxath",
  //     gender:"maczxczxle",
  //     description:"Sadfasfaczxczsfasfaffs"
  //   }
  // ]
  // res.send('hello from express')
  // res.status(200).json({
  //   message:'Users fetched successfully',
  //   users:users
  // })
  User.find().then(document=>{
    res.status(200).json({
    message:'Users fetched successfully',
    users:document
  })
  })
})

module.exports = app ; // to export the express app
