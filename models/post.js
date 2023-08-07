const DataTypes=require("sequelize");
const { sequelize } = require("../config");
const Posts=sequelize.define("post",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_title:{
      type:DataTypes.STRING,
      allowNull:false
  },
    body:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
  timestamps: false
});

module.exports={Posts};