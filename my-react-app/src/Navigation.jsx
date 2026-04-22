import { useNavigate } from "react-router-dom";
import "./Home.css";
import {useState} from "react"
import {Link} from "react-router-dom";

function Navigation() 
{
  const [user ,setUser]=useState();
  const[open,setOpen]=useState();

  const navigate = useNavigate();

  useEffect(()=>
  {
    const data=JSON.parse(localStorage.getItem("user"));
    setUser(data);
  },[]);

  const handleLogout=()=>{
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login")
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

           <div className="user-box">
            {! user ?(

              <i class="fa-solid fa-circle-user" onClick={()=>navigate("/Login")}></i>
            ):(
              <div className="user-menu">
                <span onClick={()=>setOpen(!open)}>
                  {user.name}
                </span>
                {open && (
                  <div className="dropdown">
                    <p onClick={()=>navigate('/MyOrders')}>My Orders</p>
                    <p onClick={handleLogout}>Logout</p>
                    </div>

                )}
                </div>
            )}
           </div>
           


          {/* <Link to="Login" ><i class="fa-solid fa-circle-user"></i></Link> */}


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