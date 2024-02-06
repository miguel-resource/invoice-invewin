import koaBody from "koa-body";
import Router from "koa-router";
import CertificateController from "../controllers/certificate.controller";
import multer from "@koa/multer";

const router = new Router();
const upload = multer();

const path = "/certificates";

router.post(path, koaBody(), CertificateController.getCertificates);
router.post(path + "/create", upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "privateKey", maxCount: 1 }
]), CertificateController.postCertificates);

export const certificateRouter = router;
