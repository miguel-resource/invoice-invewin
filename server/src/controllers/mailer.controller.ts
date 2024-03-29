import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

namespace MailerController {
  export function sendStampBillMail(
    to: string,
    nameClient: string,
    xml: string
  ) {
    const source = fs.readFileSync(
      path.join(__dirname, "../../public/templates/email/index.html"),
      "utf8"
    );

    const image = fs.readFileSync(
      path.join(__dirname, "../../public/templates/email/images/image-1.png"),
      "utf8"
    );

    const template = Handlebars.compile(source);

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.NODE_MAILER_EMAIL
          ? process.env.NODE_MAILER_EMAIL
          : "",
        pass: process.env.NODE_MAILER_PASSWORD
          ? process.env.NODE_MAILER_PASSWORD
          : "",
      },
    });

    const xmlBuffer = Buffer.from(xml, "utf-8");

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to,
      subject: "Servicio de facturación Invewin",
      text: "Factura electrónica",
      html: template({ name: nameClient, image }),
      attachments: [
        {
          filename: "Factura.xml",
          content: xmlBuffer,
          contentType: "application/xml",
        },
        {
          filename: "image-1.png",
          path: path.join(__dirname, "../../public/templates/email/images/image-1.png"),
          cid: "logo@cid",
        }
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error al enviar correo", err);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });

    // send mail
  }
}

export { MailerController };
