const Signup = require("../models/signup.model.js")
const bcrypt = require("bcryptjs") 

const getinfo = async(req,res) => {
    try{
     const userList = await Signup.find()
     res.status(200).json(userList)
    }
    catch(err){
     console.log(err)
     res.status(500).json({message:"userdata not found"})
    }
 }
 const postinfo = async (req,res) => {
     try{
         const {username,email,phoneNo,password} = req.body
         const salt =await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password,salt)
         const newUser = new Signup({username,email,phoneNo,password: hashPassword})
         await newUser.save()
         res.status(201).json(newUser)
     }
     catch(err){
         res.status(500).json({message: "Error post user"})
         console.log(err)
     }
 }
 module.exports = {postinfo,getinfo}