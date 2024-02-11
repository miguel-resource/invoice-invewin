import axios from "axios";

import qs from "qs";

const headers = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded",
};

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
  headers,
});

namespace InvewinController {
  export async function auth() {
    try {
      const body = qs.stringify({
        Grant_Type: process.env.INVEWIN_GRANT_TYPE,
        Password: process.env.INVEWIN_PASSWORD,
        Username: process.env.INVEWIN_USER,
        Client_Secret: process.env.INVEWIN_CLIENT_SECRET,
      });

      const { data } = await http.post(
        process.env.INVEWIN_API_URL + "/auth",
        body
      );

      return data.access_token;
    } catch (error) {
      console.log("error", error);
    }
  }

  export async function authCustom(
    password: string,
    userName: string,
    clientSecret: string
  ) {
    try {
      const body = qs.stringify({
        Grant_Type: process.env.INVEWIN_GRANT_TYPE,
        Password: password,
        Username: userName,
        Client_Secret: clientSecret,
      });

      const { data } = await http.post(
        process.env.INVEWIN_API_URL + "/auth",
        body
      );

      return data.access_token;
    } catch (error) {
      console.log("error", error);
    }
  }
}

export { InvewinController };
