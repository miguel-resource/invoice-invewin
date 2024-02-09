import axios from 'axios';

import SWSapienController from "./swSapien.controller"


const http = axios.create({ 
    baseURL: process.env.SW_SAPIEN_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

namespace StampBillController {

    export const stampBill = async (ctx: any) => {

        const { data } = ctx.request.body;
        const accessToken = await SWSapienController.auth();

        console.log("accessToken", accessToken);
        const res = await http.post(
            process.env.SW_SAPIEN_API_URL + "/cfdi33/issue/json/v4/b64",
            { data },
            {
                headers: {  
                    // REPLACE ENTERS AND SPACES
                    Authorization: `bearer ${accessToken.replace(/\n/g, "").replace(/\s/g, "")}`,
                    "Content-Type": "application/json",
                }
            },
        ).catch((error) => {
            ctx.throw(400, error.response.data.message);
        });

        ctx.status = 200;
        ctx.body = accessToken;
    }

}

export { StampBillController }