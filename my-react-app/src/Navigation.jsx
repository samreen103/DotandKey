import { useNavigate } from "react-router-dom";
import "./Home.css";
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
        <div class="div1">
          <marquee scrollAmount="20"> Beware : No one from our team will call you for offers , free gifts or payments </marquee>
        </div>

        <div class="div2">

          <img src="/Dot_Key_Logo.webp" alt="Logo" class="logo" />

          <div class="search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search for vitamin c" />
          </div>

          <div class="icons">
           <Link to="Cart" ><i class="fa-solid fa-cart-arrow-down"></i></Link>
            { user ?(
              <div className="user-section">
                <div className="user-top">
                  <i className="fa-solid fa-circle-user"></i>
                 <span className="user-name">{user.name}</span>
                 </div>
                   <div className="dropdown">
                    <p onClick={()=>navigate('/MyOrders')}>My Orders</p>
                    <p onClick={Logout}>Logout</p>
                    </div>
                    </div>
                ):(
                 <i className="fa-solid fa-circle-user" onClick={()=>navigate("/Signup")}></i>
                )}
            
      
          </div>
        </div>

        <nav class="nav-links">
          <div class="list">
            <li><a href="" class="links">SHOP ALL </a></li>
            <li><a href="" class="links">SKIN CONCERN</a></li>
            <li><a href="" class="links">INGREDIENTS</a></li>
            <li><Link to="/Bestsellers" class="links">BEST SELLERS</Link></li>
            <li><Link to="/Newarrivals" class="links">NEW ARRIVALS</Link></li>
            <li><Link to="/Blogs" class="links">BLOGS</Link></li>
          </div>


        </nav>
      </div>


  );
}

export default Navigation