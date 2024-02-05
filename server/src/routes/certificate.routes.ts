import koaBody from "koa-body";
import Router from "koa-router";
import CertificateController from "../controllers/certificate.controller";
import multer from "@koa/multer";


const router = new Router();
const upload = multer();

const path = "/certificates";

router.post(path, koaBody(), CertificateController.getCertificates);
router.post(path + "/post", upload.single("file"), CertificateController.postCertificates);

export const certificateRouter = router;
