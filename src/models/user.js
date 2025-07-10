const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required : true
  },
  lastname: {
    type: String,
  },
  emailId: {
    type: String,
    required : true,
    lowercase : true,
    unique : true,
    trim : true,
  },
  password: {
    type: String,
    required : true
  },
  age: {
    type: Number,
    min :18,
    max : 50
  },
  gender: {
    type: String,
  },
  photoUrl : {
    type : String ,
    default : "https://ukfostering.org.uk/wp-content/uploads/2016/11/dummy-female-img.jpg"
  },
  about : {
    type : String,
    default : "A man with solid dreams"
  },
  skills : {
    type : [String]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  }
})

const UserModal =  mongoose.model("User" , userSchema)

module.exports = UserModal