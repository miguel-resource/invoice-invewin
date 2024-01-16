import koa from "koa";
import dotenv from "dotenv";

// Routes
import { invewinRouter } from "./routes/invewin.routes";

const app = new koa();

dotenv.config();

app.use(invewinRouter.routes());

app.listen(
  process.env.PORT
  , () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
