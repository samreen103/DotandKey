const mongoose= require("mongoose");


const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email: {
        type:String,
        required:[true, "Email is required"],
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    }
},
);


 const UsersModel = mongoose.model("users" , UsersSchema)
 module.exports = UsersModel;