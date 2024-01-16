import { InvewinController } from "../controllers/invewin.controller";
import koaBody from "koa-body";
import Router from "koa-router";



const router = new Router();

router.post("/invewin/auth", koaBody(), InvewinController.auth);


export { router as invewinRouter };
