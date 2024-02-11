"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRouter = void 0;
var koa_body_1 = __importDefault(require("koa-body"));
var koa_router_1 = __importDefault(require("koa-router"));
var company_controller_1 = __importDefault(require("../controllers/company.controller"));
var router = new koa_router_1.default();
var path = "/company";
router.post(path, (0, koa_body_1.default)(), company_controller_1.default.getCompanyEmisor);
router.post(path + "/auth", (0, koa_body_1.default)(), company_controller_1.default.authCompany);
router.post(path + "/update", (0, koa_body_1.default)(), company_controller_1.default.updateCompany);
router.post(path + "/invoices", (0, koa_body_1.default)(), company_controller_1.default.getInvoices);
exports.companyRouter = router;
