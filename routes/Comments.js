const express=require("express")
const router=express.Router()
const {Comments}=require("../models")
const {validateToken}=require("../middlewares/AuthMiddleware")


router.post("/",validateToken, async (req,res)=>{
    const comment=req.body
    await Comments.create(comment)
    res.json(comment)
})

router.get('/',async (req,res)=>{
    const comments=await Comments.findAll()
    res.json(comments)
})

router.get('/:postId',async (req,res)=>{
    const id=req.params.postId
    const comments=await Comments.findAll({
        where:{
            PostId:id
        }
    })
    res.json(comments)
})

router.delete("/:commentId",validateToken, async (req,res)=>{
    const commentId=req.params.commentId
    await Comments.destroy({
        where:{
            id:commentId
        }
    })
    res.json("Comment was deleted!")
})

module.exports=router