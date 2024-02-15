import nodemailer from 'nodemailer';



namespace MailerController {
    export function sendStampBillMail(to: string) {

        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.NODE_MAILER_EMAIL ? process.env.NODE_MAILER_EMAIL : '',
                pass: process.env.NODE_MAILER_PASSWORD ? process.env.NODE_MAILER_PASSWORD : ''
            }
        });
        
        const mailOptions = {
            from: process.env.NODE_MAILER_EMAIL, 
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

