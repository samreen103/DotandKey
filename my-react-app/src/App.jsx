import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Admindashboard from "./Admindashboard";
import AdminHome from "./AdminHome";
import Adminlogin from "./Adminlogin";
import AddProduct from "./AddProduct";
import ManageProducts from "./ManageProducts";
import EditProduct from "./EditProduct";
import ManageUsers from "./ManageUsers";
import EditUser from "./EditUser";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Footer from "./Footer";
import Bestsellers from "./Bestsellers";
import Newarrivals from "./Newarrivals";
import Navigation from "./Navigation";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Address from "./Address";
import Checkout from "./Checkout";
import ManageOrders from "./ManageOrders";
import MyOrders from "./MyOrders";
import Payments from "./Payments";

import "@fortawesome/fontawesome-free/css/all.min.css";

function Layout() {
  const location = useLocation();

  const hideNavandFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/Adminlogin";

  return (
    <div>
      {!hideNavandFooter && <Navigation />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/Bestsellers" element={<Bestsellers />} />
        <Route path="/Newarrivals" element={<Newarrivals />} />

        
        <Route path="/Adminlogin" element={<Adminlogin />} />

          <Route path="/admin" element={<Admindashboard />}>
          <Route index element={<AdminHome/>}/>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>

      {!hideNavandFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;