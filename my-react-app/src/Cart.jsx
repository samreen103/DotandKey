import "./Cart.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart"));
    if (!data) {
      data = [];
    }
    for (let i = 0; i < data.length; i++) {
      if (!data[i].quantity) {
        data[i].quantity = 1;
      }
      data[i].price = Number(data[i].price);
    }
    
    setCartItems(data);
    localStorage.setItem("cart", JSON.stringify(data));
  }, []);

  const increase = (index) => {
    let updated = [...cartItems];
    updated[index].quantity = updated[index].quantity + 1;
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (index) => {
    let updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity = updated[index].quantity - 1;
    }
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    let updated = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (i !== index) {
        updated.push(cartItems[i]);
      }
    }

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price * cartItems[i].quantity;
  }

  return (
    <div className="cart">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.file} width="70"  />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={() => decrease(index)}>-</button>
                    {item.quantity}
                    <button onClick={() => increase(index)}>+</button>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Amount: ₹{total}</h3>
          <button className="check-btn" onClick={() => navigate("/checkout")}>Checkout </button>
        </>
      )}
    </div>
  );
}

export default Cart;