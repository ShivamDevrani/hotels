
// for authentication
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy // also known as id password strategy

const Person=require('./models/Person');


// defining middleware for authentication local strategy which will verify
passport.use(new LocalStrategy(async (username,password,done)=>{
    //authentication logic here
    try{ 

         // finding the username present in person model or not
         const user= await Person.findOne({username:username});
         
        
         if(!user)
           return done(null, false, { message: 'Incorrect username.' });

         const ispasswordmatch=await user.comparePassword(password);
         if(ispasswordmatch)
        return done(null,user);
      else
      return done(null,false,{message:"incorrect password"});
  
    }catch(err){
         console.log(err);
         return done(err);
    }
  }))


module.exports=passport;