import koa from "koa";
import KoaCors from "@koa/cors";
import { koaBody } from "koa-body";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";


// Routes
import { invewinRouter } from "./routes/invewin.routes";
import { catalogRouter } from "./routes/catalog.routes";
import { clientOnlineRouter } from "./routes/clientOnline.routes";


const app = new koa();

app.use(KoaCors());
// app.use(koaBody());
// app.use(bodyParser());

dotenv.config();

app.use(invewinRouter.routes());
app.use(catalogRouter.routes());
app.use(clientOnlineRouter.routes());

app.listen(
  process.env.PORT
  , () => {
  
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
