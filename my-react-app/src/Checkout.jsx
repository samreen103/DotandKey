import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Checkout() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let data=JSON.parse(localStorage.getItem("cart"));
    if(!data){
      data=[];
    }
    setCartItems(data);
  },[]);


  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const finalTotal = subtotal + gstAmount;

  return (
    <div className="checkout">
      <h2>Order Summary</h2>
      {cartItems.map((item) => (
        <div className="check-details" key={item._id}>
          <img src={item.file} alt={item.name} />
          <div className="quantity">
            <p>{item.name}</p>
            <p>₹ {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="bill">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
        <p>Total: ₹{finalTotal.toFixed(2)}</p>
      </div>
      <button onClick={() => navigate("/Address")}>
        Buy Now
      </button>
    </div>
  );
}

export default Checkout;