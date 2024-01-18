import koa from "koa";
import KoaCors from "@koa/cors";


import dotenv from "dotenv";


// Routes
import { invewinRouter } from "./routes/invewin.routes";
import { catalogRouter } from "./routes/catalog.routes";

const app = new koa();

app.use(KoaCors());

dotenv.config();

app.use(invewinRouter.routes());
app.use(catalogRouter.routes());

app.listen(
  process.env.PORT
  , () => {
  
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
