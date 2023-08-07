const DataTypes=require("sequelize");
const { sequelize } = require("../config");
const users = require("./user");
const { Posts } = require("./post");
const Comments=sequelize.define("comment",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           },
    body:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
  timestamps: false
}
);
// Comments.hasMany(users, { foreignKey: 'id' });
// Comments.hasMany(Posts, { foreignKey: 'postId' });



module.exports=Comments;