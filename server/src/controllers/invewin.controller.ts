import axios from "axios";

const headers = {
  Accept: "*/*",
  "Content-Type": "application/x-www-form-urlencoded",
};

namespace InvewinController {
  export async function auth(ctx: any) {
    const { username, password } = ctx.request.body;
    const response = await axios.post(
      `${process.env.INVEWIN_API_URL}/auth`,
      {
        Grant_Type: "password",
        Password: password,
        Username: username,
        Client_Secret: process.env.INVEWIN_CLIENT_SECRET,
      },
      {
        headers,
      }
    );
  
    ctx.body = response.data;
  }
}

export { InvewinController };
