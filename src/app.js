const express = require('express');
const app = express();

app.use('/hello', (req, res) => {
  res.send('Test');
});

app.get('/user/:userId/:userName/:password',(req,res) => {
    // console.log(req.query);
    console.log(req.params);
    
    res.send({firstName : "Sahil", lastName : "Singla"})
})

app.post('/user',(req,res) => {
    res.send("Stored in database successfully")
})

app.delete('/user',(req,res) => {
    res.send("Deleted successfully from databasse");
})

// app.use('/', (req, res) => {
//   res.send('HelloWorld');
// });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
