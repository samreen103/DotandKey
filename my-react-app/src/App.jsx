
import Admindashboard from "./Admindashboard"
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
import ManageOrders from "./ManageOrders"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, Link, Outlet,useLocation } from 'react-router-dom';
import Payments from "./Payments";


function Layout() {
  const location=useLocation();
  const hideNavandFooter= location.pathname==="/Adminlogin"|| location.pathname==="/admindashboard" || location.pathname==="/AddProduct" || location.pathname==="/ManageProducts" ||location.pathname==="/ManageOrders"|| location.pathname==="/ManageUsers"  || location.pathname.includes("/EditProduct") || location.pathname.includes("/EditUser") ;
  
  
  return (

    
    <div>
      {!hideNavandFooter && <Navigation/>}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Adminlogin" element={<Adminlogin/>}/>
        <Route path="/admindashboard" element={<Admindashboard/>}/> 
        <Route path="/AddProduct" element={<AddProduct/>}/> 
        <Route path="/ManageProducts" element={<ManageProducts/>}/> 
        <Route path="/ManageOrders" element={<ManageOrders/>}/>
        <Route path="/EditProduct/:id" element={<EditProduct/>}/> 
        <Route path="/EditUser/:id" element={<EditUser/>}/> 
        <Route path="/ManageUsers" element={<ManageUsers/>}/> 
        <Route path="/Bestsellers" element={<Bestsellers/>}/>
        <Route path="/Newarrivals" element={<Newarrivals/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/order/:id" element={<ManageOrders/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Checkout" element={<Checkout/>}/>
        <Route path="/Address" element={<Address/>}/>
        <Route path="/Payments" element={<Payments/>}/>


      </Routes>
     {!hideNavandFooter && <Footer/>}
    </div>
  );
}

function App()
{
  return(
    <BrowserRouter>
    <Layout/>
    </BrowserRouter>
  )
}





export default App
