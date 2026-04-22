import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Payments()
{
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [payment,setPayment]=useState()
  const user = JSON.parse(localStorage.getItem("user"));

  
  useEffect(()=>{
    let data=JSON.parse(localStorage.getItem("cart"));
    if(!data){
      data=[];
    }
    setCartItems(data);
  },[]);

 let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].price * cartItems[i].quantity;
  }
  
const loadRazorpay=()=>{
  return new Promise((resolve)=>{
    const script=document.createElement("script");
    script.src="https://checkout.razorpay.com/v1/checkout.js";
    script.onload=()=>{
      resolve(true)
    }
    script.oneerror=()=>{
      resolve(false)
    }
    document.body.appendChild(script);
  })
}

const placeOrder =async () => {

   if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

  if(payment===""){
    alert("Select a payment method")
    return
  }
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let address = JSON.parse(localStorage.getItem("address")) || {}; 

  if(payment==="COD"){
    await axios.post("https://dotandkey.onrender.com/place",{
      items:cart,
      address:address,
      payment:"COD",
      total:total,
      status:"Pending",
      userId:user._id
    })
    alert("Order placed successfully")
    localStorage.removeItem("cart")
    localStorage.removeItem("address")
    navigate("/")
  }
  else if(payment==="Razorpay")
  {
  const loaded=await loadRazorpay();
  if(!loaded){
    alert("Razorpay failed")
    return;
  }

  try{
    const res=await axios.post("https://dotandkey.onrender.com/orders",{
      amount:total,
    });
    const data=res.data;
    const options={
      key:"rzp_test_SawQtgPBn45ZB4",
      amount:data.amount,
      currency:data.currency,
      order_id:data.id,

      name:"samreen",
      description:"Order payment",

      handler:async function(response){
        await axios.post("https://dotandkey.onrender.com/place", {
         items: cart,
         address: address,
         payment: "Razorpay",
         total: total,
         paymentId:response.razorpay_payment_id,
         userId:user._id
        
      });
      alert("Payment succesful")

      localStorage.removeItem("cart")
      localStorage.removeItem("address")
      navigate("/")

    },
    prefill:{
      name:address.name|| "",
      email:address.email||"",
      contact:address.phone||"",
    },
    theme:{
      color:"#6b4848"
    },
  };
  const paymentObject=new window.Razorpay(options);
  paymentObject.open();
}catch(err){
  console.log(err);
  alert("Payement failed")
}
}
}

  
    return(
        <div className="payment-container">
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" onChange={()=>setPayment("COD")}/>
              Cash On Delivery
            </label>
            <label>
              <input type="radio" name="payment" onChange={()=>setPayment("Razorpay")}/>
              Razorpay
            </label>
          </div>
      <h2> Razorpay Payment</h2>
      
      <h3>Total Amount: ₹{total}</h3>
      <button onClick={placeOrder}> Pay</button>
    </div>
  );
}
    

export default Payments