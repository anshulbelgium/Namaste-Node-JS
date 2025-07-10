const mongoose = require('mongoose');


const connectDb = async() => {
  await mongoose.connect('mongodb+srv://coursesanshul:anshul%40123@cluster0.576vbux.mongodb.net/devTinder');
}

module.exports = connectDb


