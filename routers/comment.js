const Comments = require("../models/comments");
const { Posts } = require("../models/post");

const commentRouter=require("express").Router();

commentRouter.get("/read",async(req,res)=>{
    let id=req.query.postId;
    let data;
    if(id){
    data=await Comments.findAll({where:{postId:id}});
    }else {
    data=await Comments.findAll({where:{authorId:req.body.user_id}});
    }
    res.send(data);
})

commentRouter.post("/create",async(req,res)=>{ try {
    let body=req.body;
    // console.log(body);
    if(body.postId&&body.body){
        let post_id=await Posts.findOne({where:{id:body.postId}});
        if(post_id){
        let payload={"authorId":body.user_id,"postId":body.postId,"body":body.body};
       let p= await Comments.create(payload);
        res.status(200).send("created");
        }else {
            res.send("post not avaliable")
        }
    }else {
        res.send({"msg":"please fill all the field"});
    }
} catch (error) {
    res.send(error);
}
})

commentRouter.patch("/update/:id",async(req,res)=>{
    try {
        let body=req.body
        body.post_title=body.title;
        let id=req.params.id;
            let data = await commentRouter.findOne({ where: { id: id } });
        if (data) {
          await data.update(body);
          res.send("done")
        }else {
            res.send({"msg":"please provide vaild id"})
        }
    } catch (error) {
        res.send(error)
    }
})

commentRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let body=req.body
        body.post_title=body.title;
        let id=req.params.id;
            let data = await commentRouter.findOne({ where: { id: id } });
        if (data) {
          await data.destroy(body);
          res.send("done")
        }else {
            res.send({"msg":"please provide vaild id"})
        }
    } catch (error) {
        res.send(error)
    }
})
module.exports={commentRouter}