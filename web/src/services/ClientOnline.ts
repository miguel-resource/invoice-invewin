import axios from "axios";

const path = "/client-online";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getClientOnline = (companyID: string, rfc: string) => {
  return http.post(path, {
    empresaID: companyID,
    rfc,
  });
};

export const postClientOnline = (data: any) => {
  return http.post(path + "/create", data);
};

export const putClientOnline = (data: any) => {
  return http.post(path + "/update", data);
}