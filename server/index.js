
require("dotenv").config();

const express = require("express")
const mongoose=require('mongoose')
const cors= require("cors")
const multer=require('multer')
const path=require('path')
const UsersModel = require('./models/Users')
const ProductsModel=require('./models/Products')
const OrdersModel=require('./models/Order')
const sendMail=require("./mailsend")
const Razorpay=require("razorpay")
const cloudinary=require("./cloudinary");



const app= express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname,"public/images")));


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.json("No user found");
    }
    if (user.password !== password) {
      return res.json("Wrong password");
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
    

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.json("User already exists");
    }
    const newUser = new UsersModel({
      name,
      email,
      password
    });

    await newUser.save();
    res.json(newUser);   

  } catch (err) {
    console.log(err);
    res.status(500).json("Error in signup");
  }
});

const {cloudinaryStorage, CloudinaryStorage}=require("multer-storage-cloudinary");
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"products",
        allowed_formats:["jpg","png","webp"]
    },
});
const upload = multer({ storage });


app.post("/AddProduct", upload.single("file"), async (req, res) => {
    try {

        const product = new ProductsModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            file: req.file.path
        });

        const result = await product.save();
        res.json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.get('/getUsers',(req,res)=>{
    UsersModel.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get('/getUsers/:id',(req,res)=>{
    const id=req.params.id;
    UsersModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

app.put('/EditUser/:id' , (req ,res)=>{
    const id=req.params.id;
    UsersModel.findByIdAndUpdate({_id:id},
        {
        email:req.body.email,
        password:req.body.password
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})

app.delete('/DeleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UsersModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))

})

app.get('/getProducts',(req,res)=>{
    ProductsModel.find()
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})

app.get('/getProducts/:id',(req,res)=>{
    const id =req.params.id;
    ProductsModel.findById({_id:id})
    .then(product=>res.json(product))
    .catch(err=>res.json(err))
})

app.put('/EditProduct/:id' , upload.single("file"),async (req,res)=>{
    try{
    const id=req.params.id;
    const updateData={
        name:req.body.name,
         price:req.body.price, 
         category:req.body.category , 
         description:req.body.description,
    }

    if(req.file){
        updateData.file=req.file.path;
    }
    else{
        updateData.file=req.body.file
    }
    const product= await ProductsModel.findByIdAndUpdate(
        id,updateData,{new:true}
    );
    res.json(product);
}catch(err)
{
    console.log(err);
    res.status(500).json(err)
}
});

app.delete('/DeleteProduct/:id',(req,res)=>{
    const id=req.params.id;
    ProductsModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/orders',async(req,res)=>{
    try{
        const {amount}=req.body;
        const options={
        amount:amount*100,
        currency:"INR",
        receipt:"receipt#1",
    };
    const order=await razorpay.orders.create(options)
    res.json(order);
}catch(err){
    console.log(err)
    res.status(500).json("Error")
}
});
     

app.post("/place", async (req, res) => {
  try {
    const { items, address, payment, total, status ,paymentId,userId} = req.body;
    const newOrder = new OrdersModel({ 
      items: items,
      address: address,
      payment: payment,
      total: total,
      status:status ,
      paymentId:paymentId,
      userId:userId, 
    });
    await newOrder.save();

     sendMail(
        address.email,
        "<b>Dot and Key</b>  Order Placed",
        `<h3>Hello ${address.name}</h3>
        <p>Your Order has been placed successfully</p>
        <p>
        <p>Status:Pending</p> `
    )
    res.json("Order placed successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error placing order");
  }
});

app.get('/getOrders',(req,res)=>{
    OrdersModel.find()
    .then((orders)=>res.json(orders))
    .catch((err)=>res.status(500).json(err))
})

app.put('/updateStatus/:id', async (req, res) => {
  try {
    const id = req.params.id;      
    const status = req.body.status;    
    const updatedOrder = await OrdersModel.findByIdAndUpdate(id,{ status: status });
    let message="";
    if(status==="Shipped"){
        message=`<h3>Hello ${updatedOrder.address.name}</h3>
        <p>Your order has been Shipped </p>`
    }
    else if(status==="Delivered"){
        message=`<h3>Hello ${updatedOrder.address.name}</h3>
        <p>Your order has been Delivered </p>`
    }
    if (message !==""){
        sendMail(
        updatedOrder.address.email,
        "<b>Dot and Key</b> Order Update" ,message
        );
    }
    res.json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error updating status");
  }
});

app.get("/myOrders/:userId", async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.params.userId
    });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching orders");
  }
});

const PORT=process.env.PORT ||3001;
app.listen(PORT, () =>{
    console.log("server is running on port"+ PORT);
});










