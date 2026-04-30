
import { Link, Outlet } from "react-router-dom";
import "./Admins.css";

function Admindashboard() {
  return (
    <div className="admin-container">

      <div className="sidebar">
        <h2>Admin</h2>

        <Link to="add-product">Add Product</Link>
        <Link to="manage-products">Manage Products</Link>
        <Link to="manage-users">Manage Users</Link>
        <Link to="manage-orders">Manage Orders</Link>
      </div>

      <div className="content">
        <Outlet />
      </div>

    </div>
  );
}
export default Admindashboard;