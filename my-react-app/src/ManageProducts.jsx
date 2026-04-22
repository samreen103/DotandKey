import { useEffect,useState } from "react";
import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageProducts()
{ 
    const [products, setProducts]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/getProducts')
        .then(product=> setProducts(product.data))
        .catch(err=>console.log(err))
    } ,[])


    const handleDelete=(id)=>{
        axios.delete('http://localhost:3001/DeleteProduct/'+id)
        .then(res=>{console.log(res)
            window.location.reload()
        }
    )
        .catch(err=>console.log(err))

    }
    
    return(
        <div className="M-Product">
            <h2 > Manage Products</h2>
             <div className="manage-Product"> 
                <table className="table">
                    <thead>
                        <tr>
                            <th> Name</th>
                           <th> Price</th>
                            <th> Category</th>
                            <th> Description</th>
                            <th> Image</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product)=>{
                                return <tr>
                                    <td>{product.name}</td>
                                     <td>{product.price}</td>
                                      <td>{product.category}</td>
                                       <td className="description">{product.description}</td>
                                       <td>
                                        <img src={product.file}/>
                                       </td>
                                       <td>
                                       <button className="mlink"> <Link to={`/EditProduct/${product._id}`} >Edit</Link>   </button> 

                                        <button onClick={(e)=>handleDelete(product._id)} className="mlink">Delete</button>
                                        </td>

                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

      </div>
    )
}
export default ManageProducts