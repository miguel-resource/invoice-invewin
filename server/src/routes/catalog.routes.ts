import Router from "koa-router";


import convertExcelToJson from "convert-excel-to-json";
import { getAllCatalogs } from "../controllers/catalog.controller";

const router = new Router();

const path = "/catalog";

router.get(path, async (ctx) => {    
    const catalogs = await getAllCatalogs(ctx);
    ctx.body = catalogs;
}
);


export { router as catalogRouter };