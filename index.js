const experss=require("express");
const { sequelize } = require("./config");
const { UserRouter } = require("./routers/user");
const Authentication = require("./middelwares/Authentication");
const { PostRouter } = require("./routers/post");
const { commentRouter } = require("./routers/comment");

const app=experss();
app.use(experss.json());

app.get("/",(req,res)=>{
    res.send("done");
})
app.use("/users",UserRouter);
app.use(Authentication);
app.use("/post",PostRouter);
app.use("/comment",commentRouter);
app.get("/check",(req,res)=>{
    res.send("done");
})
app.listen("8080",async()=>{
    try {
        await sequelize.sync();
        console.log("connect");
      
    } catch (error) {
        console.log(error);  
    }
    console.log("8080");  
})