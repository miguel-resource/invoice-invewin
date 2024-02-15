import axios from "axios";

const path = "/stamp-bill";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const stampBill = async (data: any) => {
  console.log(data);
  return http.post(path, data);
};