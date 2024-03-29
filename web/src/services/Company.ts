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

export const updateCompany = async (data: any) => {
  return http.post(path + `/update`, data);
}

export const getAllInvoices = async (userName: string, password: string) => {
  return http.post(path + `/invoices`, {
    userName,
    password
  });
}

export async function getCompanyData(userName: string) {
  return http.post(path, {
    userName
  });
}

export async function getCompanyDataEmisor(userName: string, password: string) {
  return http.post(path + "/emisor", {
    userName,
    password
  });
}