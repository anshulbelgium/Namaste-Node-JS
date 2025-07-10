const validator = require('validator');


const validationForSignUp = (req) => {
    const {firstname , lastname , emailId , password} = req.body
    if(!firstname || !lastname){
        throw new Error("Name is not present")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please set a strong password")
    }
}

module.exports = validationForSignUp