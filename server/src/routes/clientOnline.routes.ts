import Router from "koa-router";
import koaBody from "koa-body";
import { ClientOnlineController } from "../controllers/clientOnline.controller";
import Koa from "koa";

const router = new Router();

const path = "/client-online";

router.post(path, koaBody(), ClientOnlineController.getClientByRFC);
router.post(path + "/create", koaBody(), ClientOnlineController.createClient);

export { router as clientOnlineRouter };
