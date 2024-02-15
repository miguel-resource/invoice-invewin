import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'servicio-facturacion-invewin@outlook.com',
        pass: 'J#1Pb@!ff!PrHVwn'
    }
});

namespace MailerController {
    export function sendStampBillMail(to: string) {
        
        const mailOptions = {
            from: 'servicio-facturacion-invewin@outlook.com', 
            to,
            subject: 'Servicio de facturación Invewin',
            text: 'Esto  es una prueba de envio de correo, para el servicio de facturación de Invewin'
        };


        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error al enviar correo", err);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        // send mail

        
    }
}

export { MailerController };

