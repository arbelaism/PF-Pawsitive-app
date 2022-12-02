import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../../utils/mailer";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { action, email, name, items, total } = req.body;
    //items y total serían para que creen un formato para el correo que te muestre lo que compraste
    console.log(action + " " + email + " " + name)
  switch (action) {
    case "contact":
      try {
        await transporter.sendMail({
          from: 'Pawsitive Team " <hayateshin@gmail.com>', // sender address
          to: email, // list of receivers
          subject: `hello ${name}`, // Subject line
          html: `<span>Thanks for contacting, our team will contact you soon!</span>`, // html body
        });
        res.status(200).json({ message: "email sent" })
      } catch (error) {
        res.status(401).json({ message: `cant send email to ${email}` })
      }
      break;

    case "otherCase":

    //usen este espacio para programar el caso de compra


      break;
  }
}
