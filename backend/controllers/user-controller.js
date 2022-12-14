const uuid = require('uuid')
const HttpError = require('../models/http-error')
const User = require('../models/user')
const {validationResult} = require('express-validator');


const getUser = async(req,res,next)=>{
    let users;
    try{
         users = await User.find({},'-password');
    }catch(err){
        const error = new HttpError('Fetching users failed, please try again later',500);
        return next(error);
    }

    res.status(200).json({
        users:users.map(elem => elem.toObject({getters:true}))
    })
}

const signup = async (req,res,next)=>{
     /*for checking if inputs provided in fields are valid or not*/
     const errors = validationResult(req);
     if(!errors.isEmpty()){

         console.log(errors.message);
         return next(new HttpError('Invalid inputs passed, please check your data.',422)) 
     }

    const {name, email, password} = req.body;

    let existingUser;
    try{
          /*avoid duplication of users*/
          existingUser = await User.findOne({email:email})
    }catch(err){
        const error = new HttpError('Signing up failed, Please try again later',500);
        return next(error);
    }
    if(existingUser){
        console.log(existingUser)
        const error = new HttpError('User exists already, please login instead',422);
        return next(error);
    }
  
    const createdUser = new User({
        name,
        email,
        image:req.file.path,
        password,
        places:[]
    });

    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError('Signing up failed, please try again',500)
        return next(error)
    }

    res.status(201).json({user: createdUser.toObject({getters:true})});
}
const login = async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
          /*avoid duplication of users*/
          existingUser = await User.findOne({email:email})
    }catch(err){
        const error = new HttpError('loggin in failed, Please try again later',500);
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in',401);
        return next(error);
    }

    res.json({message: "Logged in", user:existingUser.toObject({getters:true}) })
}

module.exports = {
    getUser,
    signup,
    login
}