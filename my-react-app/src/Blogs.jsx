import "./Blogs.css";
function Blogs()
{
    const blogs=[
        {
            id:1,
            title:"Is Vitamin C good for skin",
            image:"/blog1.webp",
            description:"Vitamin C helps brighten dull skin, reduce dark spots, improve skin texture, and protect the skin from environmental damage for a healthy natural glow.",
            author:"Dot & Key Team",
            date:"May 2 ,2026"
        },
         {
            id:2,
            title:"Best ways to treat sensitive facial skin without irritation",
            image:"/blog2.webp",
            description:"Sensitive skin needs gentle care. Learn simple skincare habits and ingredients that help calm irritation, redness, and dryness without damaging your skin barrier.",
            author:"Skin Expert",
            date:"April 25 ,2026"
        },
         {
            id:3,
            title:"How to reduce skin redness fast ? Quick and Effective remedies",
            image:"/blog3.webp",
            description:"Skin redness can happen due to irritation, heat, or dryness. Discover quick remedies and soothing skincare tips to calm your skin effectively.",
            author:"Dot & Key Team",
            date:"May 4 ,2026"
        },

    ]
    return(
        <div className="blogs">
            <h2>Latest Blogs</h2>
            <div className="blogcontainer">
                {blogs.map((blog)=>(
                    <div className="blogcard" key={blog.id}>
                        <img src={blog.image}/>
                        <div className="blogcontent">
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <span>{blog.author}</span>
                        <span>{blog.date}</span>
                     </div>
                     </div>

                ))}
            </div>

        </div>
    )
}
export default Blogs;