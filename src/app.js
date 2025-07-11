const express = require("express")
const connectDb = require("./config/database")
const User = require("./models/user")
const {userAuth} = require("./middlewears/auth")
const app = express()
const validationForSignUp = require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const  jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  try {
    validationForSignUp(req)
    const {firstname ,lastname, emailId, password} = req.body
    const passwordhash = await bcrypt.hash(password, 10)
    const userObj = new User({
      firstname, 
      lastname,
      emailId,
      password : passwordhash
    })
    await userObj.save()
    res.send("User Added succesfully")
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})


app.post("/login" ,userAuth , async(req, res) => {
   try{
    const { emailId , password} = req.body
    const user = await User.findOne({emailId :emailId})
    if(!user){
      throw new Error("Invalid Credentials")
    } 
     const isPasswordValid = await bcrypt.compare(password , user?.password)
     if(isPasswordValid){
     const token = await jwt.sign({_id : user._id}, "devTinder@123")
      res.cookie("token" , token)
      res.send("Login succesfully")
     }else{
        throw new Error("Password is not valid")
     }
   }catch(err){
    res.status(400).send("ERROR: " + err.message)
   }
})

app.get("/profile" , async(req, res) => {
 try{
  const cookies = req.cookies
   const {token} = cookies
   if(!token){
    throw new Error("Invalid Token")
   }
  const decodedToken = await jwt.verify(token , "devTinder@123")
  const { _id } = decodedToken
  const user = await User.findById({_id})
  res.send(user)
 }catch(err){
   res.status(400).send("ERROR: " + err.message)
 }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail })
    if (!users) {
      res.status(401).send("User not found")
    } else {
      res.send(users)
    }
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user)
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: userId })
    res.send("User deleted succesfully")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})

app.patch("/user", async (req, res) => {
  const userId = req.body.userId
  const data = req.body
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after"
    })
    res.send("Updated Succesfully")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})


connectDb()
  .then(() => {
    console.log("Database is connected succesfully")
    app.listen(7777, () => {
      console.log("SuccessFully connected the server")
    })
  }).catch(() => {
    console.error("Database cannot be connected ")
  })

