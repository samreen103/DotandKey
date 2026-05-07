import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

function Bestsellers() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://dotandkey.onrender.com/getProducts')
            .then(product => setProducts(product.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <img src="/BESTSELLER.webp" alt="banner" className="bestimg"/>

            <div className="home">
                <h2>Best Sellers</h2>
                <div className="product-container">
                    {products.map((product) => (
                        <Link to={`/product/${product._id}`} className="product-link">
                            <div className="product-card" key={product._id}>
                                <img src={product.file} />
                                <h4>{product.name}</h4>
                                <p>₹{product.price}</p>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>

        </div>
    );
}

export default Bestsellers;