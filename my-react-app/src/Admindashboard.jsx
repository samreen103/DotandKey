import { Link } from "react-router-dom";
import "./Admin.css";

function Admindashboard()
{
    return(
        <div class="dashboard">
            <Link to="/AddProduct" class="dlink" >Add Product</Link>
            <Link to="/ManageProducts" class="dlink" >Manage Product</Link>
            <Link to="/ManageUsers" class="dlink" >Manage Users</Link>
            <Link to="/ManageOrders" class="dlink" >Manage Orders</Link>



        </div>
    )
}
export default Admindashboard;