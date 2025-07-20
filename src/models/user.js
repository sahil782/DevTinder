const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    firstName:{
        type : String
    },
    lastName : {
        type : String
    },
    age :   {
        type : Number
    },
    gender : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }

    
})

module.exports = mongoose.model("User",Schema);