const DataTypes=require("sequelize");
const { sequelize } = require("../config");
const users=sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
        timestamps: false
      }
);

module.exports=users;