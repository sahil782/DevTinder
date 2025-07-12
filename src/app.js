const express = require('express');

const app = express();

app.listen('3000',()=> {
    console.log("Server is listening on port 3000");
    
})

app.use("/hello",(req,res)=> {
    res.send("challl gya mei");
})