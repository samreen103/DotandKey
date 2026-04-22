import { useNavigate } from "react-router-dom";
import "./Home.css";
import {Link} from "react-router-dom";

function Navigation() 
{
  const navigate = useNavigate();


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
          <Link to="Login" ><i class="fa-solid fa-circle-user"></i></Link>


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