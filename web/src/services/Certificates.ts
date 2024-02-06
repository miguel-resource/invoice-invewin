import axios from "axios";

const path = "/certificates";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-type": "multipart/form-data",
    },
});

export const getCertificates = (userName: string, password: string) => {
    return http.post(path, 
        {
            userName,
            password,
        }
    );
}