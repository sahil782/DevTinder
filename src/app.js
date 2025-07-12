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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
