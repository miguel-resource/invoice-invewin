import axios from "axios";
import { User } from "../types/User";
import { InvewinController } from "./invewin.controller";
import UserController from "./user.controller";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace CompanyController {

  export async function authCompany(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");

    const user: User = await UserController.getUser(userNameRoute);

    await InvewinController.authCustom(password, userName, user.empresaId).then(
      (data) => {
        ctx.body = data;
      }
    );

    const company = await queryGetCompany(user.empresaId);

    ctx.status = 200;
    ctx.body = company.data;
  }

  export async function queryGetCompany(companyID: string) {
    const accesToken = await InvewinController.auth();

    const data = await http.get(
      process.env.INVEWIN_API_URL + "/empresas/" + companyID,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );

    return data;
  }

  export async function getCompany(ctx: any) {
    const { userName } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");

    const user: User = await UserController.getUser(userNameRoute);

    const company = await queryGetCompany(user.empresaId);

    ctx.status = 200;
    ctx.body = company.data;
  }

  export async function getCompanyEmisor(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    const data = await http.get(
      process.env.INVEWIN_API_URL + "/empresas/emisor/" + user.empresaId,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    ctx.status = 200;
    ctx.body = data.data;
  }

  export async function updateCompany(ctx: any) {
    const { company, userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );
    // const accessToken = await InvewinController.auth();
  
    await http
      .put(
        process.env.INVEWIN_API_URL + "/empresas/emisor/" + user.empresaId,
        company,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        ctx.status = response.status;
      })
      .catch((err) => {
        console.log("ERROR", err.response.data);
        ctx.status = err.response.status;
      });

    // ctx.status = 200;
    // ctx.body = data.data;
  }

  export async function getInvoices(ctx: any) {
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
      "/documentoscfd",
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

export default CompanyController;
