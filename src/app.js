const express = require('express');
const app = express();
const {adminAuth,userAuth} = require('./middlewares/auth')
// so Basically before the res.send if request goes to multiple routes then all they act like as a middleware its all middleware chain.
app.use("/admin",adminAuth)

// you can write middleware even in the route path also
app.all("/user/specific",userAuth,(req,res,next)=>{
    console.log("1st attempt");
    next();
    
},(req,res)=>{
    console.log("2nd attempt");
    res.send("2nd attempted passed");
})

app.get("/admin/getData",(req,res)=>{
    console.log("Sent All Data");
    
    res.send("Sent All Data");
})

app.delete("/admin/delete",(req,res)=>{
    console.log("Delete All Data");
    
    res.send("Deleted all data");
})
// First of all for error handling you have to use try catch
app.get("/getUserData",(req,res) => {
    // try{
        throw new Error("fdada");
        res.send("User Data Sent")
    // }catch(err){
    //     res.status(500).send("some error occured");
    // }
    
});
// But for globally error we can configure commonly one route
app.use("/",(err,req,res,next) => {
    if(err){
        res.status(500).send("Something went wrong");
    }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
