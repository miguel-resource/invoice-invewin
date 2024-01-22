import { InvewinController } from "../controllers/invewin.controller";
import Router from "koa-router";

const router = new Router();

const path = "/invewin";

router.post(path + "/auth", InvewinController.auth);

export { router as invewinRouter };
