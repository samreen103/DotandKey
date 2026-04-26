const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html, pdfBuffer) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      html: html,

      attachments: pdfBuffer
        ? [
            {
              filename: "invoice.pdf",
              content: pdfBuffer.toString("base64"),
              encoding: "base64",
            },
          ]
        : [],
    });

    console.log("Email sent ");
  } catch (err) {
    console.log("Resend error ", err);
  }
};

module.exports = sendEmail;