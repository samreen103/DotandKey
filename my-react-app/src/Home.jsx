import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./Home.css";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom"


function Home() {

  const settings={
        dots:true,
        infinite:true,
        speed:4000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 4000,

    };
    
    const [products, setProducts]=useState([])
    useEffect(()=>{
      axios.get('https://dotandkey.onrender.com/getProducts')
      .then(product=>setProducts(product.data))
      .catch(err=>console.log(err))
    },[])

  
    
  return (
    <div>
      <div className="container">
      <Slider {...settings}>
        <div className="card">
          <img src="/image1.webp" alt="" className="carousel"/>
        </div>

        <div className="card">
          <img src="/image2.webp" alt="" className="carousel" />
        </div>


        <div className="card">
          <img src="/image3.webp" alt="" className="carousel"/>
        </div>

        <div className="card">
          <img src="/image4.webp" alt=""className="carousel" />
        </div>
        
      </Slider>
    </div>

    <Categories/>

    <div className="home">
      <h2>All Products</h2>
      <div className="product-container">
        {products.map((product)=>(
          <Link to={`/product/${product._id}`}className="product-link">
          <div className="product-card" key={product._id}>
            <img src={product.file}/>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            </div>
            </Link>

        ))}
      </div>
    </div>

</div>
  

  )
}

export default Home
