import axios from "axios";
import { User } from "../types/User";
import { InvewinController } from "./invewin.controller"
import UserController from "./user.controller";

const http = axios.create({
    baseURL: process.env.INVEWIN_API_URL
})

namespace DocumentsCFDController {

    export const queryCreateDocument = async (empresaID: string, data: any, paymentMethod: string) => {
        const accessToken = await InvewinController.auth();


        data.cadenaOriginalSAT = "" // TODO: get cadena original from SAT
        data.cfdi = "" // TODO: get cfdi from SAT
        data.serie = "asd" // TODO: get serie from SAT
        data.formaDePago = paymentMethod

        console.log("DATA to CREATE DOCUMENT", data);

        await http.post(
            process.env.INVEWIN_API_URL + "/empresas/" + empresaID + "/documentoscfd",
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then((response: any) => {
            console.log("RES CREATE DOCUMENT", response.data);
        }).catch((error) => {
            console.log("ERROR CREATE DOCUMENT", error.response.data);
        });
    }
}

export { DocumentsCFDController }



        