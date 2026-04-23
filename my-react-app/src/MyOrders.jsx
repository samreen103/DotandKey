import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/Login");
      return;
    }

    axios.get(`https://dotandkey.onrender.com/myOrders/${user._id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) =>
              order.items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.file} width="50" />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyOrders;