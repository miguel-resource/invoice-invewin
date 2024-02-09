import Router from "koa-router";
import {StampBillController} from '../controllers/stampBill.controller';
import koaBody from "koa-body";


const router = new Router();

const path = "/stamp-bill";

router.post(path, koaBody(), StampBillController.stampBill);


export { router as stampBillRouter };