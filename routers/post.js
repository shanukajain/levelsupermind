const Comments = require("../models/comments");
const { Posts } = require("../models/post");
const users = require("../models/user");
const { sequelize } = require("../config");


const PostRouter=require("express").Router();

PostRouter.get("/title",async(req,res)=>{
//     let data=await Posts.findAll({
//         attributes: ['post_title']
// });
let data=await Posts.findAll({
attributes: [
    [sequelize.fn('DISTINCT', sequelize.col('post_title')), 'post_title']
  ]
});
let title=data.map((el)=>el.post_title);
    res.send({"titles":title});
})


PostRouter.get("/body",async(req,res)=>{
    let post_title=req.query.post_title;
    let data=await Posts.findAll({
        where:{post_title},

        
});
let user=await users.findAll();
let comments=[]
let postusers=[];
for(let i=0;i<data.length;i++){
    console.log(data[i].id);
    let comment=await Comments.findAll({where:{postId:data[i].id}});
    comments.push(comment);
        for(let j=0;j<user.length;j++){
        if(user[j].id==data[i].authorId){
            postusers.push(user[j].username);
            break;
        }
    }
}
    res.send({data:data,postusers,comments});
})

PostRouter.post("/create",async(req,res)=>{
    try {
        let body=req.body;
        if(body.title&&body.body){
            let payload={"authorId":body.user_id,"post_title":body.title,"body":body.body};
           let p= await Posts.create(payload);
            res.status(200).send({"msg":"created"});
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