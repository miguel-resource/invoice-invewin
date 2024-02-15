import Koa from "koa";
import { InvewinController } from "./invewin.controller";
import axios from "axios";
// import { Auth } from "./invewin.controler";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace ClientOnlineController {
  export async function getClientByID(id: string, empresaID: string) {
    const accessToken = await InvewinController.auth();

    const data = await http.get(
      process.env.INVEWIN_API_URL +
        "/empresas/" +
        empresaID +
        "/clientesonline/" +
        id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.data;
  }

  export async function queryUpdateClient(
    id: string,
    empresaID: string,
    data: any
  ) {
    const accessToken = await InvewinController.auth();

    await http
      .put(
        process.env.INVEWIN_API_URL +
          "/empresas/" +
          empresaID +
          "/clientesonline/" +
          id,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  }

  export async function queryCreateClient(empresaID: string, data: any) {
    const accessToken = await InvewinController.auth();

    await http
      .post(
        process.env.INVEWIN_API_URL + "/empresas/" + empresaID + "/clientesonline",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("error", error.response.data);
      });
  }

  

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
