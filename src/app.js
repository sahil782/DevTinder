const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const validation = require("./helpers/validationCustom.js");
const {validateSignupData} = validation;
User.init().then(() => {
  console.log("Indexes ensured");
}).catch(err => {
  console.error("Index error:", err);
});

app.use(express.json());
app.post("/signup",async (req,res)=>{
    try{
        //validate of data
        validateSignupData(req.body);
        // console.log(req.body);
        const {firstName, email,age, gender,skills,photoUrl,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        // console.log(passwordHash); return false;
        //  console.log(passwordHash); return false;
        
        const user = new User({
            firstName,
            email,
            age,
            gender,
            skills,
            photoUrl,
            password : passwordHash
        });
        // console.log(user);
        await user.save();
        res.status(201).send("User saved successfully");
    }catch(err){
        res.status(400).send(`Error saving the user ${err.message}`);
    }
})

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        const checkUser = await User.findOne({email:email});
        console.log(checkUser);
        
        if(!checkUser){
            throw new Error("User not found in our DB");
        }
        const isPassword = await bcrypt.compare(password,checkUser.password);
        if(isPassword){
            res.send("User Login successfully");
        }else{
            throw new Error("Password not matched");
        }

    }catch(err){
        res.status(400).send(`Error : ${err.message}`);
    }
});

app.get("/user", async (req,res) => {
    const userEmail = req.body.email;
    try{
        const user =  await User.find({email:userEmail});
        if(user.length === 0){
            res.status(404).send("User not found");
        }else{
            res.status(200).send(user);
        }

    }catch(err){
        res.status(400).send(`Error finding the user ${err.message}`);
    }
    
})

//Get all user data
//Find one method gives only one relevant data
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(`Error finding the user ${err.message}`);
    }
    
})

//Get find user by id

app.get("/user/id", async (req,res) => {

   try{
     const id = req.body.id;
        const user = await User.findById({_id:id});
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.status(200).send(user);
        }
   }catch (err){
    res.status(400).send(`Error finding the user ${err.message}`);
   }
})

//Delete the user

app.delete("/user", async (req,res) => {
    try{

        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        if(user){
            res.send("User Successfully deleted")
        }else{
            res.status(404).send("User not found");
        }
    }catch(err){
        res.status(400).send(`Error deleting the user ${err.message}`);
    }

})

// Update the user

app.patch("/user/:userId",async (req,res)=> {

    const userId = req.params?.userId;
    //const userEmail = req.body.email;
    try{
        const data = req.body;
        const Allowed_updates = ["age","email","gender","skills","photoUrl"];
        const is_updated_allowed = Object.keys(data).every((k) => Allowed_updates.includes(k));
        if(!is_updated_allowed){
            throw new Error("Update Not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("Skill length should not be greater than 10");
        }
        const user = await User.findByIdAndUpdate({_id:userId},data, {returnDocument:'before',runValidators:true});
        // const user = await User.findOneAndUpdate({email:userEmail},data,{returnDocument:'after',runValidators:true});
        console.log(user);
        res.send("User updated successfully");

    }catch (err){
        res.status(400).send(`Error updating the user ${err.message}`);
    }
})


connectDB().then(()=>{
    console.log("Database connection successfully");
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}).catch((err)=>{
    console.log("Database cannot be connected");
    
})




