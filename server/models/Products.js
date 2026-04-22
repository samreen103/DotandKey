const mongoose= require("mongoose");


const ProductsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Name is required"],
    },
    price:{
        type:String,
        required:[true, "Price is required"],
    },
    category:{
        type:String,
        required:[true, "Category is required"],
    },

    description:{
        type:String,
        required:[true, "Description is required"],
    },
    file:{
        type:String
    }


},
);

 const ProductsModel = mongoose.model("products" , ProductsSchema)
 module.exports = ProductsModel;