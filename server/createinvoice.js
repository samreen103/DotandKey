const PDFDocument =require("pdfkit");
const fs=require("fs");

const generatePDF=(order)=>{
    return new Promise((resolve)=>{
      const doc=new PDFDocument();
      let buffers=[];
      doc.on("data",buffers.push.bind(buffers));
      doc.on("end",()=>{
        const pdfData=Buffer.concat(buffers);
        resolve(pdfData);
      });

    doc.fontSize(25).text("Dot&Key  Invoice",100 ,50);
    doc.fontSize(12).text(`Name: ${order?.address?.name}`,100,120);
    doc.text(`Email:${order?.address?.email}`,100,140);
    doc.text(`Payment:${order?.payment}`,100,160);
    doc.text(`Status: ${order?.status}`,100,180);

   
    let total=0;

    if(order?.items && order.items.length>0){
        order.items.forEach((item)=>{
            const itemTotal=item.price*item.quantity;
            doc.text(
                `${item.name}|Qty:${item.quantity}|${item.price}|Total:${itemTotal}`,100,220
            )
        })
    }
    else{
        doc.text("No items found",100,220);
    }

    const gst=total*0.18;
    const finalTotal=total+gst;
    doc.text(`Subtotal: ${total.toFixed(2)}`,100,260);
    doc.text(`GST (18%): ${gst.toFixed(2)}`,100,320);
    doc.text(`GrandTotal: ${finalTotal.toFixed(2)}`,100,380);
    doc.end();
    });
    

};
module.exports=generatePDF();