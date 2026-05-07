import "./Contact.css"
function Contact()
{
    return(
        <div className="contactpage"> 
        <div className="contactcontainer">
            <div className="contactleft">
                <h2> Contact Us</h2>
                <p>
                    We'd love to hear from you. If you have any questions about products, orders , or skincare, feel free to contact us.
                </p>
                <div className="contactdetails">
                    <p><strong>Email:</strong>support@dotandkey.com</p>
                    <p><strong>Phone:</strong>+91 9875489858</p>
                    <p><strong>Address:</strong>support@dotandkey.com</p>
                </div>
            </div>
            <div className="contactright">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <input type="text" placeholder="Subject " />
                <textarea placeholder="Your Message"></textarea>
                <button>Send Message</button>
            </div>
            </div>  
        </div>
    )
}
export default Contact