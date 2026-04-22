import{useEffect,useState} from "react"
import{useNavigate} from "react-router-dom"
import "./Home.css";

function Checkout()
{
    const [cartItems ,setCartItems]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        const data= JSON.parse(localStorage.getItem("cart"));
        setCartItems(data);
    }, []);

    const total=cartItems.reduce(
        (sum,item)=>sum+item.price*item.quantity,0
    )

    return(
        <div className="checkout">
            <h2>Order Summary </h2>
            {cartItems.map((item)=>(
                <div className="check-details"key={item._id}>
                     <img src={`http://localhost:3001/images/${item.file}`} />
                     <div className="quantity">
                    <p>{item.name}</p>
                    <p>₹ {item.price}</p>
                    <p>quantity: {item.quantity}</p>
                    </div>
                    
                    </div>
            ))}
            <h3>Total: ₹{total}</h3>
          <button onClick={()=>navigate("/Address")}>Buy now</button>
        </div>
    )

}
export default Checkout;