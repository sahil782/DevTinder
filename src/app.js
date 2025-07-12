const express = require('express');
const app = express();

app.use("/user",(req,res,next)=>{
    console.log("Response1");
     //res.send("Response1");
    next();
    
},(req,res,next)=>{
    console.log("Response 2");
    //res.send("Response2");
    next();
    
},(req,res,next)=>{
    console.log("Response 3");
    //res.send("Response3");
    next();
    
},(req,res,next)=>{
    console.log("Response 4");
    // res.send("Response4");
    next();
    
},(req,res,next)=>{
     console.log("Response 5");
    res.send("Response5");
    
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
