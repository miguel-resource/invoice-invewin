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
    console.log("data", typeof data.data);

    ctx.status = 200;
    ctx.body = data.data
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
    console.log("data", data);

    ctx.status = 200;
    ctx.body = data;
  }
}

export { ClientOnlineController };
