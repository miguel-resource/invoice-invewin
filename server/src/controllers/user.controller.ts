import axios from "axios";

const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});


namespace UserController {

   
    export async function getUser(userName: string) {
      const data = await http.get(
        process.env.INVEWIN_API_URL + "/auth/" + userName
      );

      console.log("data", data.data);

      return data.data;
    }
   
}

export default UserController;