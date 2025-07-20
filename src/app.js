const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user")


app.use(express.json());
app.post("/signup",async (req,res)=>{
    console.log(req.body);
    
    const user = new User(req.body);
    // console.log(user); return false;
    
    try{
        await user.save();
        res.status(201).send("User saved successfully");
    }catch(err){
        res.status(400).send(`Error saving the user ${err.message}`);
    }
})

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


connectDB().then(()=>{
    console.log("Database connection successfully");
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}).catch((err)=>{
    console.log("Database cannot be connected");
    
})




