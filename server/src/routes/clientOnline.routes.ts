import Router from "koa-router";
import koaBody from "koa-body";
import { ClientOnlineController } from "../controllers/clientOnline.controller";


const router = new Router();

const path = "/client-online";

router.post(path, koaBody(), ClientOnlineController.getClientByRFC);
router.post(path + "/create", koaBody(), ClientOnlineController.createClient);
router.post(path + "/update", koaBody(), ClientOnlineController.updateClient);

export { router as clientOnlineRouter };