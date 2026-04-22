const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema({
    items:[
    {
        name:String,
        price:Number,
        quantity:Number,
        file:String
    }
],
    address:
    {
        name:String,
        email:String,
        phone:String,
        pincode:String,
        address:String,
        city:String,
        state:String
    },
    payment:
    {
        type:String
    },
    total:
    {
        type:Number
    },
    status:
    {
        type:String,
        default:"Pending"
    
    },
    paymentId:
    {
        type:String
    }
     
});

const OrdersModel=mongoose.model("order" , OrderSchema)
module.exports=OrdersModel;
