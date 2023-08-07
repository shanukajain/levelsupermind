const users = require("../models/user");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const UserRouter = require("express").Router();
UserRouter.get("/", async (req, res) => {
  let data = await users.findAll();

  res.send(data);
});

UserRouter.post("/sign_up", async (req, res) => {
  let body = req.body;
  try {
    // console.log(body);
    let data = await users.findOne({where:{ "username": body.username }});
    console.log(data);
    if (data) {
        console.log(data,123);
      res.send({ msg: "user already exits" });
    } else {
      bcrypt.hash(body.password, 5, async function (err, hash) {
        body.password = hash;
        console.log(hash);
        await users.create(body);
        res.send({ msg: "account created" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});
UserRouter.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let data = await users.findOne({where:{ username }});
    console.log(data);
        bcrypt.compare(password, data.password).then(function(result) {
            if(result){
                let token = jwt.sign({ id: data.id }, "login");
                res.send({ token: token });
            }else {
                res.send({"msg":"wrong password"})
            }
        });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { UserRouter };
