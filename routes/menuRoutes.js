const express=require('express');

const router=express.Router();

const menu=require('../models/menu');

router.get('/',async(req,res)=>{
     
    try{
        const data=await menu.find();
        console.log("fetched");
        res.status(200).json(data);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }

}) 
router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='sweet'|| tasteType=='sour'|| tasteType=='spicy')
        {
             const data=await menu.find({taste:tasteType});
             console.log("fetched");
             res.status(200).json(data);

        }
        else
        { 
            console.log("not valid");
            res.status(404).json({error:"not found"});
        }
        
         
    }catch(err){
         console.log(err);
         res.status(500).json({error:"internal server error"});
    }
})

router.post('/',async (req,res)=>{
    try{

        const data= req.body;
        const newmenu=new menu(data);

         const response=await newmenu.save();

         console.log("created");
         
        res.status(200).json(response);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:"internal server error"});

    }

})

router.put('/:id',async (req,res)=>{
    try{
        const menuId=req.params.id;

        const update_file=req.body;

        const response=await menu.findByIdAndUpdate(menuId,update_file,{
            new:true,
            runValidators:true
        });

        if(!response)
        {
            
            return res.status(404).json({error:"id not found"});
        }
        console.log("updated successfully");
        res.status(200).json(response);


    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }

})

router.delete('/:id',async(req,res)=>{
     try{
        const menuId=req.params.id;

        const update_file=req.body;

        const response=await menu.findByIdAndDelete(menuId);

        if(!response)
        {
            
            return res.status(404).json({error:"id not found"});
        }
        console.log("deleted successfully");
        res.status(200).json(response);

     }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
     }
     

})

module.exports=router;