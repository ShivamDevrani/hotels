const mongoose=require('mongoose');

// for generating hashed password using salting and hashing process
const bcrypt=require('bcrypt');

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

//pre is a middle ware which will convert the password into hashed string and then save
//not we do not prefer to use arrow function in pre middleware because this doesnt have meaning in arrow function
personSchema.pre('save',async function(next){

    //person is a reference to the document being saved. and this refers to document (or instance of schema) on which the middleware
    //is currently working .
    const person=this;

    // we will hash the password only if person changes the password or is new login

    if(!person.isModified('password')) return next();

    try{
        //generating salt randomly
    
        const salt=await bcrypt.genSalt(10);
        //hashed password
        const hashpassword=await bcrypt.hash(person.password,salt);

        //overiding the plain password with hashedpassword
        person.password=hashpassword;
        //next callback function is used to give the signal to mongoose that now you
        //  can move to either next middleware or just save this progtam
        next();

    }catch(err)
    {
       return   next(err);
    }
})

//making function inside personschema
personSchema.methods.comparePassword=async function(candidatePassword){
    
    try{
          const ismatch=await bcrypt.compare(candidatePassword,this.password);
          return ismatch;
    }
    catch(err){
          throw err;
    }

}

//creating persons model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;