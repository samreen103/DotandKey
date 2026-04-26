import {useEffect,useState} from "react";
import axios from "axios";
import "./Admin.css";
function ManageOrders()
{
    const [orders,setOrders]=useState([]);

    const status=["Pending","Shipped","Delivered"];

    useEffect(()=>{
     axios.get("https://dotandkey.onrender.com/getOrders")
     .then((res)=>{
        setOrders(res.data)
     })
     .catch((err)=>{
        console.log(err);
     })
    },[]);

    async function orderStatus(id,e){
        let status=e.target.value;
        await axios.put("https://dotandkey.onrender.com/updateStatus/"+id,{status:status});

    const res = await axios.get("https://dotandkey.onrender.com/getOrders");
    setOrders(res.data);
    }
   


    return(
        <div className="order-container">
            <h2>Manage Orders</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Items</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Payment ID</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    {order.items.map((item,index)=>(
                                        <div key={index}>
                                            {item.name}<br></br>
                                            <img src={item.file} width="60" height="60" />

                                        </div>
                                    ))}
                                </td>
                                <td>{order.address.name} <br></br>
                                    {order.address.email} <br></br>
                                    {order.address.phone} <br></br>
                                    {order.address.address}<br></br>
                                    {order.address.city}<br></br>
                                    {order.address.state}<br></br>
                                    {order.address.pincode}<br></br>
                                </td>
                                <td>{order.total .toFixed(2)}</td>
                                <td>{order.payment}</td>
                                <td>{order.paymentId}</td>
                                <td>
                                   <select className="form-control"  onChange={(e)=>orderStatus(order._id,e)}>
                                    {
                                        status.map((status,index)=>
                                        {
                                            return(
                                                <option key={index} 
                                                selected={order.status==status ?true:false}
                                                disabled={order.status==status ?true:false} value={status}>{status}
                                                </option>
                                            )
                                        })
                                    }
                                   </select>
                                </td>
                            </tr>
                        ))

                    }

                </tbody>
            </table>
        </div>
    )
}
export default ManageOrders;