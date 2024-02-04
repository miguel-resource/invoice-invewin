import koaBody from "koa-body";
import Router from "koa-router";
import CertificateController from "../controllers/certificate.controller";


const router = new Router();

const path = "/certificates";

router.post(path, koaBody(), CertificateController.getCertificates);

export const certificateRouter = router;
