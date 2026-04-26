import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/Login");
      return;
    }

    axios
      .get(`https://dotandkey.onrender.com/myOrders/${user._id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="orders-page">
      <div className="profile-card">
        <i className="fa-solid fa-circle-user profile-icon"></i>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) =>
            order.items.map((item) => (
              <div className="order-card" key={item._id}>
                <img src={item.file} />
                <div className="order-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <span className="status">
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MyOrders;