const express=require("express")
const router=express.Router()
const {Posts}=require("../models")
const {validateToken}=require("../middlewares/AuthMiddleware")


router.post("/",validateToken,async (req,res)=>{
    const post=req.body
    await Posts.create(post)
    res.json(post)
})

router.get('/',async (req,res)=>{
    const postList=await Posts.findAll()
 
    res.json(postList)
})

router.delete("/:postId",validateToken,async (req,res)=>{
    const id=req.params.postId
    await Posts.destroy({
        where:{
            id:id
        }
    })
})

router.get('/byId/:postId',async (req,res)=>{
    const id=req.params.postId
    const post=await Posts.findOne({
        where:{
            id:id
        }
    })
    res.json(post)
})

router.get('/byuserId/:postId',async (req,res)=>{
    const id=req.params.postId
    const post=await Posts.findAll({
        where:{
            id:id
        }
    })
    res.json(post)
})

router.put("/edit/:id",validateToken,async (req,res)=>{
    
    const id=req.params.id

    await Posts.findOne({where:{id:id}})
    .then((post)=>{
        post.title=req.body.title
        post.postText=req.body.postText
        post.save()
        .then((p)=>{
           res.json(p)
        })
    })
})

module.exports=router