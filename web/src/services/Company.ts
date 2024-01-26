import axios from "axios";

const path = "/company";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authCompany = async (userName: string, password: string) => {
  return http.post(path + "/auth", {
    userName,
    password,
  });
};
