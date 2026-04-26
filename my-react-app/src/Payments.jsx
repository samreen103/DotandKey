import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Payments() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [payment, setPayment] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart"));
    if (!data) data = [];
    setCartItems(data);
  }, []);

  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += cartItems[i].price * cartItems[i].quantity;
  }

  const gst = subtotal * 0.18;
  const finalTotal = subtotal + gst;

  
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false); 

      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/Signup");
      return;
    }

    if (payment === "") {
      alert("Select a payment method");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let address = JSON.parse(localStorage.getItem("address")) || {};

    if (!cart.length) {
      alert("Cart is empty");
      return;
    }

    if (!address.name || !address.email) {
      alert("Enter address");
      return;
    }

    if (payment === "COD") {
      try {
        await axios.post("https://dotandkey.onrender.com/place", {
          items: cart,
          address: address,
          payment: "COD",
          total: finalTotal,
          status: "Pending",
          userId: user._id,
        });

        alert("Order placed successfully ");
        localStorage.removeItem("cart");
        localStorage.removeItem("address");
        navigate("/");
      } catch (err) {
        console.log(err);
        alert("Order failed ");
      }
    }
    else if (payment === "Razorpay") {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay failed to load");
        return;
      }

      try {
        const res = await axios.post( "https://dotandkey.onrender.com/orders",
          {
            amount: Math.round(finalTotal), 
          }
        );

        const data = res.data;

        const options = {
          key: "rzp_test_SawQtgPBn45ZB4",
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,

          name: "Dot&Key",
          description: "Order Payment",

          handler: async function (response) {
            try {
              await axios.post("https://dotandkey.onrender.com/place", {
                items: cart,
                address: address,
                payment: "Razorpay",
                status: "Pending", 
                total: finalTotal,
                paymentId: response.razorpay_payment_id,
                userId: user._id,
              });

              alert("Payment successful ");

              localStorage.removeItem("cart");
              localStorage.removeItem("address");
              navigate("/");
            } catch (err) {
              console.log(err);
              alert("Saving order failed ");
            }
          },

          prefill: {
            name: address.name || "",
            email: address.email || "",
            contact: address.phone || "",
          },

          theme: {
            color: "#6b4848",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          console.log(response.error);
          alert("Payment failed ");
        });

        paymentObject.open();
      } catch (err) {
        console.log(err);
        alert("Payment initialization failed ");
      }
    }
  };

 
  return (
    <div className="payment-container">
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            onChange={() => setPayment("COD")}
          />
          Cash On Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            onChange={() => setPayment("Razorpay")}
          />
          Razorpay
        </label>
      </div>

      <h3>Total Amount: ₹{finalTotal.toFixed(2)}</h3>

      <button onClick={placeOrder}>Pay</button>
    </div>
  );
}

export default Payments;