import axios from "axios";

const path = "/client-online";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getClientOnline = (empresaID: string, rfc: string) => {
  return http.post(path, {
    empresaID,
    rfc,
  });
};

export const postClientOnline = (data: any) => {
  return http.post(path + "/create", data);
};
