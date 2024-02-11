"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invewinRouter = void 0;
var invewin_controller_1 = require("../controllers/invewin.controller");
var koa_router_1 = __importDefault(require("koa-router"));
var router = new koa_router_1.default();
exports.invewinRouter = router;
var path = "/invewin";
router.post(path + "/auth", invewin_controller_1.InvewinController.auth);
