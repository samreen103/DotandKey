import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



function EditProduct()
{
    const {id} =useParams()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const navigate=useNavigate()

    const [select,setSelect]=useState("");

     useEffect(()=>{
        axios.get('https://dotandkey.onrender.com/getProducts/'+id)
        .then(product=>{console.log(product)
            setName(product.data.name)
            setPrice(product.data.price)
            setCategory(product.data.category)
            setDescription(product.data.description)
            setFile(product.data.file)

     })
        .catch(err=>console.log(err))
    } ,[id])

    const Edit = (e)=>{
        e.preventDefault();
        const formData= new FormData();
        formData.append('file', file)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('category', category)

        axios.put(`https://dotandkey.onrender.com/EditProduct/${id}`,formData)
        .then(result=>{
            console.log(result)
            navigate('/ManageProducts')
        })
        .catch(err=>console.log(err))

    }

    
    return(
        <div className="Product">
            <h2 > Edit Products</h2>
            <form >
                
                <label class="label"> Name</label>
                <input type="text" placeholder="Enter Product Name" className="input-box"
                value={name} onChange={(e)=> setName(e.target.value)} />

                <label class="label">Price</label>
                <input type="text" placeholder="Enter the Product Price" className="input-box"  
                value={price} onChange={(e)=> setPrice(e.target.value)} />

                <label className="label">Category</label>
                
                <select className="input-box"
                    value={category} onChange={(e) => { setCategory(e.target.value) }} >
                    <option >Sunscreen</option>
                    <option >Moisturizer</option>
                    <option >Serum</option>
                    <option >Face Wash</option>
                    <option >Eye Care</option>
                    </select>
                

                <label class="label">Description</label>
                <textarea placeholder="Enter the Product Description" className="input-box" 
                value={description} onChange={(e)=> setDescription(e.target.value)} />

                <label class="label">Image</label>

                <input type="file" className="input-box" name="file"  onChange={(e) => { setFile(e.target.files[0]) }} />

                <button type="button" onClick={Edit} className="button">Edit Product</button>
            </form>

        </div>

    )
}

export default EditProduct;