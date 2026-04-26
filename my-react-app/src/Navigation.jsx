import { useNavigate } from "react-router-dom";
import "./navigation.css";
import {useState,useEffect} from "react"
import {Link} from "react-router-dom";

function Navigation() 
{
  const [user ,setUser]=useState();

  const navigate = useNavigate();

  useEffect(()=>
  {
    const data=JSON.parse(localStorage.getItem("user"));
    setUser(data);
  },[]);

  const Logout=()=>{
    localStorage.removeItem("user");
    setUser(null);
    navigate("/")
  }

  return (
    
      <div>
        <div className="div1">
          <marquee scrollAmount="20"> Beware : No one from our team will call you for offers , free gifts or payments </marquee>
        </div>

        <div className="div2">

          <img src="/Dot_Key_Logo.webp" alt="Logo" class="logo" />

          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search for vitamin c" />
          </div>

          <div className="icons">
           <Link to="Cart" ><i class="fa-solid fa-cart-arrow-down"></i></Link>
            { user ?(
              <div className="user-section">
                <div className="user-top">
                  <i className="fa-solid fa-circle-user"></i>
                 <span className="user-name">{user.name}</span>
                 </div>
                   <div className="dropdown">
                    <p onClick={()=>navigate('/MyOrders')}>My Profile</p>
                    <p onClick={Logout}>Logout</p>
                    </div>
                    </div>
                ):(
                 <i className="fa-solid fa-circle-user" onClick={()=>navigate("/Signup")}></i>
                )}
            
      
          </div>
        </div>

        <nav className="nav-links">
          <div className="list">
            <li><a href="" className="links">SHOP ALL </a></li>
            <li><Link to="/Bestsellers" className="links">BEST SELLERS</Link></li>
            <li><Link to="/Newarrivals" className="links">NEW ARRIVALS</Link></li>
            <li><Link to="/Blogs" className="links">BLOGS</Link></li>
          </div>


        </nav>
      </div>


  );
}

export default Navigation