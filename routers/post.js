const { Posts } = require("../models/post");

const PostRouter=require("express").Router();

PostRouter.get("/read",async(req,res)=>{
    let data=await Posts.findAll();
    res.send(data);
})

PostRouter.post("/create",async(req,res)=>{
    try {
        let body=req.body;
        // console.log(body);
        if(body.title&&body.body){
            let payload={"authorId":body.user_id,"post_title":body.title,"body":body.body};
           let p= await Posts.create(payload);
            res.status(200).send("created");
        }else {
            res.send({"msg":"please fill all the field"});
        }
    } catch (error) {
        res.send(error);
    }
})
PostRouter.patch("/update/:id",async(req,res)=>{
    try {
        let body=req.body
        body.post_title=body.title;
        let postId=req.params.id;
            let data = await Posts.findOne({ where: { id: postId } });
        console.log(body,postId,data);
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

PostRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let postId=req.params.id;
            let data = await Posts.findOne({ where: { id: postId } });
        console.log(data);
        if (data) {
        // await comment.destroy({ where: { postId: postId } });
          await data.destroy();
          res.send("done")
        }else {
            res.send({"msg":"please provide vaild id"})
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={PostRouter}