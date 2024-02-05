import axios from "axios";

import UserController from "./user.controller";

import { User } from "../types/User";
import { InvewinController } from "./invewin.controller";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace CerfificatesController {
  // export async function postCertificates(ctx: any) {
  //     const { userName, password } = ctx.request.body;

  //     const userNameRoute = userName.replace("@", "%40");
  //     const user: User = await UserController.getUser(userNameRoute);

  //     const accessToken = await InvewinController.authCustom(
  //       password,
  //       userName,
  //       user.empresaId
  //     );

  //     const data = await http.get(
  //       process.env.INVEWIN_API_URL +
  //         "/empresas/" +
  //         user.empresaId +
  //         "/certificados",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     ctx.status = 200;
  //     ctx.body = data.data;
  //   }

  export async function getCertificates(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );
    console.log(accessToken);

    const data = await http.get(
      process.env.INVEWIN_API_URL +
        "/empresas/" +
        user.empresaId +
        "/documentoscfd",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(data.data);

    ctx.status = 200;
    ctx.body = data.data;
  }

  export async function postCertificates(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    const data = await http.get(
      process.env.INVEWIN_API_URL +
        "/empresas/" +
        user.empresaId +
        "/certificados",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    ctx.status = 200;
    ctx.body = data.data;
  }
  
}

export default CerfificatesController;