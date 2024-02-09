import axios from "axios";

const http = axios.create({
  baseURL: process.env.SW_SAPIEN_API_URL,
  headers: {
    password: process.env.SW_SAPIEN_API_PASSWORD,
    user: process.env.SW_SAPIEN_API_USER,
  },
});

namespace SWSapienController {
  export const auth = async () => {
    const data = {};

    const response = await http
      .post(process.env.SW_SAPIEN_API_URL + "/security/authenticate", data, {
        headers: {
          password: process.env.SW_SAPIEN_API_PASSWORD,
          user: process.env.SW_SAPIEN_API_USER,
        },
      })
      .catch((error) => {
        console.log("ERROR", error);
      })
      .then((response: any) => {
 

        return response.data.data;
      });

    return response.token;
  };
}

export default SWSapienController;
