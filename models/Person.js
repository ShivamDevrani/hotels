const mongoose=require('mongoose');

//define a person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true          // this line means it is mandatory to have it in order to save it in mongo database
    },
    age:{
        type:Number,
        
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        require:true,
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true              //this line is used to have unique email,like in web pages we see this email has already been registered
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }


})

//creating persons model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;