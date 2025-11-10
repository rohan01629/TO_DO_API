const express = require("express");
const Todo = require("../models/todoModel");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

//create todo
router.post("/",protect,async(req,res)=>{
    try{
        const todo = Todo.create({
            user:req.user._id,
            title:req.body.title,
        });
        res.status(201).json(todo);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});
//get all todos
router.get("/",protect,async(req,res)=>{
    const todos = await Todo.find({user:req.user._id});
    res.json(todos);
});

//update todo
router.put("/:id",protect,async(req,res)=>{
try{
    const todo = await Todo.findOneAndUpdate(
        {_id:req.params.id,user:req.user._id},
        {title:req.body.title,completed:req.body.completed},
        {new:true}
       
    );
    if(!todo) return res.status(404).json({message:"Todo not found"});
    res.json(todo);

}catch(error){
    res.status(500).json({message:error.message});
}
});

//delete todo
router.delete("/:id",protect,async(req,res)=>{
try{
    const todo = await Todo.findOneAndDelete({_id:req.params.id,user:req.user._id});
    if(!todo) return res.status(404).json({message:"todo not found"});
    res.json({message:"Todo deleted"});
}catch(error){
    res.status(500).json({message:error.message});
}
});
module.exports = router;
