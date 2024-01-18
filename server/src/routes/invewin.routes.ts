import { InvewinController } from "../controllers/invewin.controller";
import koaBody from "koa-body";
import Router from "koa-router";

const router = new Router();

const path = "/invewin";

router.post(path + "/auth", koaBody(), InvewinController.auth);

export { router as invewinRouter };
