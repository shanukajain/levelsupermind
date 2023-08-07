const jwt=require("jsonwebtoken")
let Authentication=(req,res,next)=>{
let token=req.headers.authorization;
console.log(token);
if(token){
    const decode=jwt.verify(token,"login");
    req.body.user_id=decode.id;
    next();
}else {
    res.send("login first");
}
}
module.exports=Authentication