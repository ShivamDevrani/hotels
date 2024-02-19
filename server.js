
const express = require('express');
const app = express();

//importing the database
const db=require('./db');


const menu=require('./models/menu');

//import the body parser middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());    // this data will be in req.body


//import the personRouter files
const personRoutes=require('./routes/personRoutes');
//importing the menu router files
const menuRoutes=require('./routes/menuRoutes');

app.use('/person',personRoutes);

app.use('/menu',menuRoutes);

app.get('/', function (req, res) {
  res.send('Hello,How can i help you');
})



app.listen(4000,()=>console.log("server is live"));
