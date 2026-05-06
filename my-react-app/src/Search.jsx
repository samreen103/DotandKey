import {useEffect ,useState} from "react";
import {useParams,Link} from "react-router-dom";
import axios from "axios";

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