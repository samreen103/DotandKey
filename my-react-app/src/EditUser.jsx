import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditUser()
{
    const {id} =useParams()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()

    useEffect(()=>{
        axios.get('https://dotandkey.onrender.com/getUsers/'+id)
        .then(result=>{console.log(result)
            setEmail(result.data.email)
            setPassword(result.data.password)
    })
        .catch(err=>console.log(err))
    },[id])

    const Edit=(e)=>{
        e.preventDefault();
        axios.put("https://dotandkey.onrender.com/EditUser/"+id,{email,password})
        .then(result=>{
            console.log(result)
            navigate('/ManageUsers')
        })
        .catch(err=>console.log(err))
    }


    return(
      
            <div className="Product">
            <h2 > Edit Users</h2>
            <form >
                
                <label class="label"> Email</label>
                <input type="text" placeholder="Enter Email" className="input-box"
                value={email} onChange={(e)=> setEmail(e.target.value)} />

                <label class="label">Password</label>
                <input type="password" placeholder="Enter the Password" className="input-box"  
                value={password} onChange={(e)=> setPassword(e.target.value)} />

                <button type="button" onClick={Edit} className="button">Edit User</button>

                </form>

</div>

        
    )
}
 export default EditUser