"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientOnlineRouter = void 0;
var koa_router_1 = __importDefault(require("koa-router"));
var koa_body_1 = __importDefault(require("koa-body"));
var clientOnline_controller_1 = require("../controllers/clientOnline.controller");
var router = new koa_router_1.default();
exports.clientOnlineRouter = router;
var path = "/client-online";
router.post(path, (0, koa_body_1.default)(), clientOnline_controller_1.ClientOnlineController.getClientByRFC);
router.post(path + "/create", (0, koa_body_1.default)(), clientOnline_controller_1.ClientOnlineController.createClient);
router.post(path + "/update", (0, koa_body_1.default)(), clientOnline_controller_1.ClientOnlineController.updateClient);
