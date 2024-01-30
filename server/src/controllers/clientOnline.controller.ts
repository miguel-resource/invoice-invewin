import Koa from "koa";
import { InvewinController } from "./invewin.controller";
import axios from "axios";
// import { Auth } from "./invewin.controler";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace ClientOnlineController {
  export async function getClientByRFC(ctx: any) {
    const accessToken = await InvewinController.auth();

    const { empresaID, rfc } = ctx.request.body;

    const data = await http
      .get(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          empresaID +
          "/clientesonline/receptor/" +
          rfc,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        ctx.status = 400;
        ctx.body = error.response.data;

        return error.response.data;
      });

    ctx.status = 200;
    if (data.data) {
      ctx.body = data.data;
    }
  }

  export async function createClient(ctx: any) {
    const accessToken = await InvewinController.auth();
    const { empresaID, client } = ctx.request.body;

    const data = await http
      .post(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          empresaID +
          "/clientesonline",
        client,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.log("error", error.response.data);
        ctx.status = 400;
        ctx.body = error.response.data;

        return error.response.data;
      });

    ctx.status = 200;
    ctx.body = data;
  }

  export async function updateClient(ctx: any) {
    const accessToken = await InvewinController.auth();
    const { companyID, clientID, client } = ctx.request.body;

    await http
      .put(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          companyID +
          "/clientesonline/" +
          clientID,
        client,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        ctx.status = 400;
        ctx.body = error.response.data;

        return error.response.data;
      });

    ctx.status = 200;
  }
}

export { ClientOnlineController };
