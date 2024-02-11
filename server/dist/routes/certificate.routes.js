"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificateRouter = void 0;
var koa_body_1 = __importDefault(require("koa-body"));
var koa_router_1 = __importDefault(require("koa-router"));
var certificate_controller_1 = __importDefault(require("../controllers/certificate.controller"));
var multer_1 = __importDefault(require("@koa/multer"));
var router = new koa_router_1.default();
var upload = (0, multer_1.default)();
var path = "/certificates";
router.post(path, (0, koa_body_1.default)(), certificate_controller_1.default.getCertificates);
router.post(path + "/create", upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "privateKey", maxCount: 1 }
]), certificate_controller_1.default.postCertificates);
router.post(path + "/update", upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "privateKey", maxCount: 1 }
]), certificate_controller_1.default.updateCertificates);
exports.certificateRouter = router;
