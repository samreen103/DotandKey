import { useEffect,useState } from "react";
import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
function ManageUsers()
{
    const [users, setUsers]= useState([])
    useEffect(()=>{
        axios.get('https://dotandkey.onrender.com/getUsers')
        .then(users=>setUsers(users.data))
        .catch(err=>console.log(err))
    },[])

    const handleDelete =(id)=>{
         axios.delete('https://dotandkey.onrender.com/DeleteUser/'+id)
       .then(res=>{console.log(res)
        window.location.reload()
    })
    .catch(err=>console.log(err))
  
    }


    
    return(
        <div className="M-Product">
                    <h2 > Manage Users</h2>
                     <div className="manage-Product"> 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> Email</th>
                                   <th> Password</th>
                                    <th>Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user)=>{
                                        return <tr>
                                            <td>{user.email}</td>
                                             <td>{user.password}</td>
                                               <td>
                                               <button className="mlink" ><Link to={`/EditUser/${user._id}`} >Edit</Link>    </button> 
                                                <button onClick={(e)=>handleDelete(user._id)} className="mlink">Delete</button>
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

export default ManageUsers