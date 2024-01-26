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

    const company = await getCompany(user.empresaId);

    ctx.status = 200;
    ctx.body = company.data;
  }

  export async function getCompany(companyID: string) {
    const accesToken = await InvewinController.auth();

    const data = await http.get(
      process.env.INVEWIN_API_URL + "/empresas/" + companyID,
      {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      }
    );

    console.log("data", data.data);

    return data;
  }
}

export default CompanyController;
