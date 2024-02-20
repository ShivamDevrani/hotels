const express=require('express');

const router=express.Router();

const Person=require('../models/Person');


router.post('/',async (req,res)=>{
    try{
     const data=req.body;
     
     const newPerson=new Person(data);

     const response=await newPerson.save();

     console.log("saved successfully");

     res.status(200).json(response);

    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }


 })

//get method to get the person
router.get('/',async (req,res)=>{

 try{
    
     const data= await Person.find();
     console.log("data fetched successfully");
     res.status(200).json(data);

 }catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
      
 }

})


//parameterised method for get
router.get('/:workType',async (req,res)=>{
 try{
     const workType=req.params.workType;         //extracting the work type from url
     if(workType=='chef'|| workType=='manager'|| workType=='waiter')
     {
         const data=await Person.find({work:workType});
         console.log("fetched success");
         res.status(200).json(data);
     }
     else
     {
         res.status(404).json({error:"invalid worktype"});
     }
     

 }catch(err)
 {
     console.log(err);
     res.status(500).json({error:"internal server error"});
 }
})

// put method to update the files
router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;    //extracting the id from url

        const updated_data=req.body;

        const response= await Person.findByIdAndUpdate(personId,updated_data,{
            new:true,          //return the updated document
            runValidators:true //run mongoose validation
        });
        if(!response)
        {
            return  res.status(404).json({error:"person not found"});
        }

        console.log("update successfully");
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
})
//delete
router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
      const response=await Person.findByIdAndDelete(personId);
      if(!response)
      {
        return  res.status(404).json({error:"id not found"});
      }
      
      console.log("deleted successfully");
        res.status(200).json(response);

    }
   catch(err)
   {
    console.log(err);
    res.status(500).json("internal server error");
   }
})
module.exports=router;