import {useEffect,useState } from "react";
import {  useNavigate } from "react-router-dom";

import axios from "axios";
import { useParams  } from "react-router-dom";
import "./Home.css";



function ProductDetails()
{
    
   const {id} =useParams()
   const [product , setProduct] = useState({});
    const navigate=useNavigate()

   useEffect(()=>{
      axios.get(`http://localhost:3001/getProducts/${id}`)
      .then(product=>setProduct(product.data))
      .catch(err=>console.log(err))
    },[id]);

    const addToCart=()=>
    {
        const existingCart=JSON.parse(localStorage.getItem("cart"))||[];
        const existingItem= existingCart.find ((item)=>item._id===product._id);

        if(existingItem)
            {
            existingItem.quantity+=1;
        }
        else{
        existingCart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        category:product.category,
        file:product.file,
        quantity:1
        });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to cart")    
    navigate("/cart")
};

    return(
        <div className="details">
            <img src={`http://localhost:3001/images/${product.file}`}/>
            <div className="product-details">
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <button onClick={addToCart}>Add to Cart </button>
            </div>
        </div>
    )
}
export default ProductDetails;