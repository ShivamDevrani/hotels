const jwt=require('jsonwebtoken');

require('dotenv').config();

const jwtAuthMiddleware=async (req,res,next)=>{

      //extract the jwt token from request header
      const token=req.headers.authorization.split(" ")[1];
      if(!token) return res.status(401).json({error:'unauthorised'});

    try{
      const decoded=await jwt.verify(token,process.env.JWT_KEY);   //.verify return payload ,which we  used in generating token when it gets success 
      //attach the user information to request object,so that further middleware or routers can use this information when needed
      req.user=decoded;
      next() ;   

    }catch(err){ 
        console.log(err);
        res.status(401).json({error:"invalid token"});
    }


}


// function for generation of jwt token

const generateToken=(userData)=>{
   //generate a new jwt token using user data
   return jwt.sign(userData,process.env.JWT_KEY,{expiresIn:300});
}

module.exports={jwtAuthMiddleware,generateToken};