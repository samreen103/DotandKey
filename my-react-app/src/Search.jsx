import {useEffect ,useState} from "react";
import {useParams,Link} from "react-router-dom";
import axios from "axios";
import './Search.css'

function Search()
{
    const {key}=useParams();
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        axios.get(`https://dotandkey.onrender.com/search/${key}`)
        .then((res)=>setProducts(res.data))
        .catch((err)=>console.log(err));
    },[key]);

    return(
        <div className="home">
            <h2> Search Results</h2>
            <div className="product">
                {products.map((product)=>(
                    <Link to={`/product/${product._id}`} className="productlink" key={product._id}>
                        <div className="productcard">
                            <img src={product.file}/>
                            <h4>{product.name}</h4>
                            <p> ₹{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Search;