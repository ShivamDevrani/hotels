const mongoose=require('mongoose');

//defining the mongo db  connection url
const mongoURL='mongodb://localhost:27017/hotels'


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
 
    