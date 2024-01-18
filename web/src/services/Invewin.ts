import axios from "axios";

const path = "/documento/venta/";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INVEWIN_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getSale = (id: string) => {
  return http.get(path + id);
};
