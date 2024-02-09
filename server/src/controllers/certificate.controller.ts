import axios from "axios";

import UserController from "./user.controller";

import { User } from "../types/User";
import { InvewinController } from "./invewin.controller";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace CerfificatesController {
  export async function getCertificates(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    const data = await http
      .get(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          user.empresaId +
          "/certificadoscsd",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.log("ERROR", error.response.data);
        console.log("ERROR INFO", error.response.data.codigoEstatus);

        ctx.throw(
          error.response.data.codigoEstatus,
          error.response.data.mensaje
        );

        return;
      })
      .then((response: any) => {
        return response;
      });

    if (data === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error" };
      return;
    }

    const certificate = Buffer.from(data.data[0].certificado, "base64");
    const privateKey = Buffer.from(data.data[0].llavePrivada, "base64");

    data.data[0].certificado = certificate;
    data.data[0].llavePrivada = privateKey;

    const passwordCertificateDecrypted = CryptoJS.AES.decrypt(
      data.data[0].password,
      process.env.CERTIFICATES_SECRET || ""
    ).toString(CryptoJS.enc.Utf8);

    data.data[0].password = passwordCertificateDecrypted.replace(
      /[^a-zA-Z0-9]/g,
      ""
    );

    ctx.status = 200;
    ctx.body = data.data;
  }

  export async function postCertificates(ctx: any) {
    const {
      passwordCertificate,
      serieInvoice,
      folioInvoice,
      userName,
      password,
    } = ctx.request.body;
    const { certificate, privateKey } = ctx.request.files;

    const certificateBase64 = certificate[0].buffer.toString("base64");
    const privateKeyBase64 = privateKey[0].buffer.toString("base64");

    const user: User = await UserController.getUser(userName);
    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    // encrypt the password of the certificate
    const passwordCertificateEncrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwordCertificate),
      process.env.CERTIFICATES_SECRET || ""
    ).toString();
    console.log("PASSWORD ENCRYPTED", passwordCertificateEncrypted);

    await http
      .post(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          user.empresaId +
          "/certificadoscsd",
        {
          serieFacturacion: serieInvoice,
          folioFacturacion: parseInt(folioInvoice),
          empresaId: user.empresaId,
          certificado: certificateBase64,
          llavePrivada: privateKeyBase64,
          password: passwordCertificateEncrypted,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.log("ERROR INFO", error.response);
        console.log("ERROR", error.response.data);
      })
      .then((response: any) => {
        console.log("RESPONSE", response);

        ctx.status = 200;
      });
  }

  export async function updateCertificates(ctx: any) {
    const {
      passwordCertificate,
      serieInvoice,
      folioInvoice,
      userName,
      password,
      id,
    } = ctx.request.body;
    const { certificate, privateKey } = ctx.request.files;
    const user: User = await UserController.getUser(userName);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    const getCertificate = await http.get(
      process.env.INVEWIN_API_URL + "/empresas/" + user.empresaId
       + "/certificadoscsd",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response: any) => {
      return response.data[0];
    }
    );


    const certificateBase64 = certificate ? certificate[0].buffer.toString("base64") : getCertificate.certificado;
    const privateKeyBase64 = privateKey ? privateKey[0].buffer.toString("base64") : getCertificate.llavePrivada;
    console.log("CERTIFICATE", certificateBase64);
    console.log("PRIVATE KEY", privateKeyBase64);

    const passwordCertificateEncrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwordCertificate),
      process.env.CERTIFICATES_SECRET || ""
    ).toString();

    await http
      .put(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          user.empresaId +
          "/certificadoscsd/" +
          id,
        {
          serieFacturacion: serieInvoice ? serieInvoice : getCertificate.serieFacturacion,
          folioFacturacion: parseInt(folioInvoice) ? parseInt(folioInvoice) : getCertificate.folioFacturacion,
          empresaId: user.empresaId ? user.empresaId : getCertificate.empresaId,
          certificado: certificateBase64,
          llavePrivada: privateKeyBase64,
          password: passwordCertificateEncrypted ? passwordCertificateEncrypted : getCertificate.password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.log("ERROR INFO", error.response);
        console.log("ERROR", error.response.data);
      })
      .then((response: any) => {
        console.log("RESPONSE", response);

        ctx.status = 200;
      });



    // const certificateBase64 = certificate[0].buffer.toString("base64");
    // const privateKeyBase64 = privateKey[0].buffer.toString("base64");


    // const passwordCertificateEncrypted = CryptoJS.AES.encrypt(
    //   JSON.stringify(passwordCertificate),
    //   process.env.CERTIFICATES_SECRET || ""
    // ).toString();
    // console.log("PASSWORD ENCRYPTED", passwordCertificateEncrypted);

    // await http
    //   .put(
    //     process.env.INVEWIN_API_URL +
    //       "/empresas/" +
    //       user.empresaId +
    //       "/certificadoscsd/" +
    //       certificateId,

    //     {
    //       serieFacturacion: serieInvoice,
    //       folioFacturacion: parseInt(folioInvoice),
    //       empresaId: user.empresaId,
    //       certificado: certificateBase64,
    //       llavePrivada: privateKeyBase64,
    //       password: passwordCertificateEncrypted,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .catch((error) => {
    //     console.log("ERROR INFO", error.response);
    //     console.log("ERROR", error.response.data);
    //   })
    //   .then((response: any) => {
    //     console.log("RESPONSE", response);

    //     ctx.status = 200;
    //   });
  }
}

export default CerfificatesController;
