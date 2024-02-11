"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stampBillRouter = void 0;
var koa_router_1 = __importDefault(require("koa-router"));
var stampBill_controller_1 = require("../controllers/stampBill.controller");
var koa_body_1 = __importDefault(require("koa-body"));
var router = new koa_router_1.default();
exports.stampBillRouter = router;
var path = "/stamp-bill";
router.post(path, (0, koa_body_1.default)(), stampBill_controller_1.StampBillController.stampBill);
