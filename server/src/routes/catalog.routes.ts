import Router from "koa-router";

import { getAllCatalogs } from "../controllers/catalog.controller";

const router = new Router();

const path = "/catalog";

router.get(path, async (ctx: any) => {
  const catalogs = await getAllCatalogs(ctx);
  ctx.body = catalogs;
});

export { router as catalogRouter };
