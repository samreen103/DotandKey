import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Address() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const[email,setEmail]=useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleContinue = () => {

    if (!name ||!email|| !phone || !pincode || !address || !city || !state) {
      alert("Please fill all fields");
      return;
    }

    const formData = {
      name,
      email,
      phone,
      pincode,
      address,
      city,
      state
    };

    localStorage.setItem("address", JSON.stringify(formData));

    navigate("/Payments");
  };

  return (
    <div className="address-container">

      <h2>Delivery Address</h2>

      <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      <input type="text" placeholder="Mobile Number"onChange={(e) => setPhone(e.target.value)}/>
      <input type="text" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)}/>
      <textarea placeholder="House No, Area, Street"onChange={(e) => setAddress(e.target.value)} ></textarea>
      <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
      <input type="text" placeholder="State" onChange={(e) => setState(e.target.value)}/>
      <button onClick={handleContinue}> Continue to Payment</button>
    </div>
  );
}

export default Address;