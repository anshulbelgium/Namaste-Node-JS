const User = require("./models/user")
const  jwt = require('jsonwebtoken');

const adminAuth = (req,res , next) => {
    const token = "xyz"
    const isAuthorise = token === "xyz"
    if(!isAuthorise){
       res.status(401).send("Unauthorise user !");
    }else{
        next();
    }
}


const userAuth = (req, res, next) => {
   try{
    const cookies = req.cookies
    const {token} = cookies
    if(!token){
        throw new Error("Invalid Token")
    }
    const decodedToken = jwt.verify(token , "devTinder@123#")
     const {_id} = decodedToken
    const user =  User.findById({_id})
    console.log(user)
   }catch(err){
      res.status(400).send("ERROR: " + err.message)
   }
}

module.exports = {adminAuth , userAuth} 