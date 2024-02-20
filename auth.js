
// for authentication
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy // also known as id password strategy

const Person=require('./models/Person');

// defining middleware for authentication local strategy which will verify
passport.use(new LocalStrategy(async (username,password,done)=>{
    //authentication logic here
    try{ 
         console.log('recieved credentials:',username,password);
         // finding the username present in person model or not
         const user= await Person.findOne({username:username});
         
        
         if(!user)
           return done(null, false, { message: 'Incorrect username.' });
   
         if(user.password!=password)
         {
             return done(null,false,{message:'incorrect password'});
         }
         
        return done(null,user);
  
    }catch(err){
         console.log(err);
         return done(err);
    }
  }))


module.exports=passport;