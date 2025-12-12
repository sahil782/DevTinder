const validator = require('validator');

const validateSignupData = (data) => {
    const {firstName, email, password} = data;

    if(!firstName){
        throw new Error("Name is not Valid");
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}

module.exports = {validateSignupData};