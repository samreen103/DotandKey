const PDFDocument = require("pdfkit");

const generatePDF = (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      let buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(22).text("Dot&Key Invoice", { align: "center" });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Name: ${order?.address?.name || ""}`);
      doc.text(`Email: ${order?.address?.email || ""}`);
      doc.text(`Phone: ${order?.address?.phone || ""}`);
      doc.text(`Payment: ${order?.payment || ""}`);
      doc.text(`Status: ${order?.status || ""}`);
      doc.moveDown();

      doc.fontSize(14).text("Items:", { underline: true });
      doc.moveDown(0.5);

      let total = 0;

      if (order?.items && order.items.length > 0) {
        order.items.forEach((item, index) => {
          const price = Number(item.price) || 0;
          const qty = Number(item.quantity) || 1;
          const itemTotal = price * qty;

          total += itemTotal;

          doc.fontSize(12).text(
            `${index + 1}. ${item.name} | Qty: ${qty} | ₹${price} | Total: ₹${itemTotal}`
          );
        });
      } else {
        doc.text("No items found");
      }

      doc.moveDown();
      const gst = total * 0.18;
      const finalTotal = total + gst;

      doc.fontSize(12).text(`Subtotal: ₹${total.toFixed(2)}`);
      doc.text(`GST (18%): ₹${gst.toFixed(2)}`);
      doc.text(`Grand Total: ₹${finalTotal.toFixed(2)}`);

      doc.moveDown();

      doc.text("Thank you for shopping with Dot&Key!", {
        align: "center",
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = generatePDF;