const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //for router method to connect actual database for sign up 
const User = mongoose.model("User") 


router.post('/gethired',(req,res)=>{
    const{name,email,phone,pic}=req.body
    if(!email || !phone || !name || !pic){
        res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})  // findOne is the mongo db operator for finding one element in the database so here email.  then it will check email already exists or not.
    .then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"User is already with that email"})    //error generated if email found already in database
        }
        else{
            const user = new User({   //create new instanse of new user with email,name,password
                name,
                email,
                phone,
                pic
            })

              user.save()      //save the user 
              .then(user=>{
                  res.json({message:"saved successfully"})       // success msg to the user
              })
              .catch(err=>{
                  console.log(err)
              })
        }
       

    })
    .catch(err=>{console.log(err)})   
    // res.json({message:"successfully posted"})
}) 



module.exports = router 