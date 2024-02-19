const mongoose=require('mongoose');

require('dotenv').config();
//defining the mongo db  connection url on local mongodb server
// const mongoURL=process.env.LOCAL_URL;

//mongo atlas database
 
 const mongoURL = process.env.DB_URL;

// set up the connection
mongoose.connect(mongoURL);

//get the default connection
const db=mongoose.connection;

//apply listeners
db.on('connected',()=>{
    console.log("mongodb is connected")

})
db.on('error',(err)=>{
    console.log("error has been occurred",err);
})

db.on('disconnected',()=>{
    console.log("mongodb is disconnected");
})


//export the database connection
module.exports=db;
 
    