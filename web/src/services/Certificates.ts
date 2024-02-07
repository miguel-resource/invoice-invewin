import axios from "axios";

const path = "/certificates";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-type": "multipart/form-data",
    },
});

export const getCertificates = (userName: string, password: string) => {
    const http = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-type": "application/json",
        },
    });
    
    return http.post(path, 
        {
            userName,
            password,
        }
    );
};

export const createCertificate = (formData: FormData) => {
    return http.post(path + "/create", formData);
}
