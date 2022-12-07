import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_PAWSITIVE, // generated ethereal user
      pass: process.env.PASS_EMAIL_PAWSITIVE, // generated ethereal password
    },
  });


transporter.verify().then(()=>{
    console.log("Ready for emails")
})