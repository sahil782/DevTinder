const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://singlasahil1154:mongoosedevtinder@namastenodejs.xak4vra.mongodb.net/devTinder");
};

module.exports = connectDB;
