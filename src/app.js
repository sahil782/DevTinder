const express = require('express');
const app = express();

app.use("/",(req,res,next)=>{
    console.log("Act like as a middleware");
    next();
})

app.get("/user",(req,res,next)=>{
    console.log("Handling / user route"); 
    next();
},(req,res,next)=>{
    console.log("1st route handler");
    res.send("1st route Handler")
}, (req,res,next)=> {
    console.log("2nd Route Handler");
    res.send("2nd Route handler");
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
