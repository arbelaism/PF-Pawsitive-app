import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../../utils/mailer";

export default async function user(req: NextApiRequest, res: NextApiResponse) {

  const { action, email, name, products, total,message,idT,estado } = req.body;

    //items y total serían para que creen un formato para el correo que te muestre lo que compraste
  switch (action) {
    case "contact":
      try {
        await transporter.sendMail({
          from: `Pawsitive Team ${process.env.EMAIL_PAWSITIVE}`, // sender address
          to: email, // list of receivers
          subject: 'Gracias por contactar a Pawsitive', // Subject line
          html: `<header><h2>Hola ${name}</h2</header>
          <h3>Gracias por contactarnos,</h3> 
          <p>Nuestro equipo te contactara pronto!</p>
          <br/>
          <p>Agradecemos tu paciencia, si tienes mas preguntas o comentarios, avisanos. Estamos aqui 24/7 y siempre felices
          de ayudarte.</p>
          <h4>Gracias por ser un cliente leal a Pawsitive</h4>`, // html body
        });
        res.status(200).json({ message: "email sent" })
      } catch (error) {
        res.status(401).json({ message: `cant send email to ${email}` })
      }
      break;

    case "sell": 
      try {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let maping = products.map((product: any)=>{
            return `<li>${product.name} ${product.price}</li>`
          })        
        
        await transporter.sendMail({
          from: `Pawsitive Team ${process.env.EMAIL_PAWSITIVE}`, // sender address
          to: email, // list of receivers
          subject: `Hola ${name}`, // Subject line
          html: `
          <body>
          <header><h1>Gracias por su compra!</h1></header>
          <p>----------------------------------------------------------------------------</p>
          <p>En este correo se adjunta la compra #${idT} con fecha ${day}/${month}/${year}, le agradecemos por usar los servicios de nuestra empresa</p>
          <div>A continuacion le detallamos que productos adquirio en esta oportunidad
              <h3>Los productos que compro son:</h3>
              <ul className='list'>
                ${maping.map((li:any)=> li)}
              </ul>
              <h3>Total: ${total}$</h3>
          </div>
          <footer><h4>Atentamente,</h4>
              <br/>
              <h3>Pawsitive Team</h3>
          </footer>
          </body>`
        });
        res.status(200).json({ message: "email sent" })
      } catch (error) {
        res.status(401).json({ message: `cant send email to ${email}` })
      }
      break;

      case "contactUs":
      try {
        await transporter.sendMail({
          from: `Cliente <${email}>`, // sender address
          to: process.env.EMAIL_PAWSITIVE, // list of receivers
          subject: 'Mensaje de Cliente', // Subject line
          html: `<span>${message}</span>`, // html body
        });
        res.status(200).json({ message: "email sent" })
      } catch (error) {
        res.status(401).json({ message: `cant send email to ${email}` })
      }
      break;

      case "sendStatus":
        try {
          let today = new Date();
          let day = today.getDate();
          let month = today.getMonth() + 1;
          let year = today.getFullYear();
          let maping = products.map((product: any)=>{
              return `<li>${product.name} ${product.price}</li>`
            })        
          
          await transporter.sendMail({
            from: `Pawsitive Team ${process.env.EMAIL_PAWSITIVE}`, // sender address
            to: email, // list of receivers
            subject: `Hola ${name}`, // Subject line
            html: `
            <body>
            <header><h1>Gracias por su compra!</h1></header>
            <p>----------------------------------------------------------------------------</p>
            <p>En este correo se adjunta la compra #${Math.random()*100} con fecha ${day}/${month}/${year}, le agradecemos por usar los servicios de nuestra empresa</p>
            <div>A continuacion le detallamos que productos adquirio en esta oportunidad
                <h3>Los productos que compro son:</h3>
                <ul className='list'>
                  ${maping.map((li:any)=> li)}
                </ul>
                <h3>Total: ${total}$</h3>
            </div>
            <footer><h4>Atentamente,</h4>
                <br/>
                <h3>Pawsitive Team</h3>
            </footer>
            </body>`
          });
          res.status(200).json({ message: "email sent" })
        } catch (error) {
          res.status(401).json({ message: `cant send email to ${email}` })
        }
        break;
  }
}
