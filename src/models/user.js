const mongoose = require('mongoose');
const validator  = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minLength : 3,
        unique:true
    },
    lastName : {
        type : String,
    },
    age :   {
        type : Number,
        required : true,
    },
    // By default validate works only when you signup the user it is not working while you update the user if you want to use the validate while updating then you need to send the options validator in findbyidandupdate whatever method you run for update
    gender : {
        type : String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender must be male, female or others")
            }
        }
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true,
        validate :function(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    photoUrl:{
        type : String,
        validate:function(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL"+value);
            }
        }
    },
    about:{
        type: String,
        default: "This is a default about the user",
    },
    skills:{
        type : [String],
    }
},{
    timestamps: true
}



)

module.exports = mongoose.model("User",Schema);