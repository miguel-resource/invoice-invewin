import axios from "axios";

const path = "/catalog";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getCatalogs = () => {
  return http.get(path);
  // console.log(process.env.NEXT_PUBLIC_API_URL)
};
