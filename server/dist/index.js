"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var cors_1 = __importDefault(require("@koa/cors"));
var dotenv_1 = __importDefault(require("dotenv"));
// Routes
var invewin_routes_1 = require("./routes/invewin.routes");
var catalog_routes_1 = require("./routes/catalog.routes");
var clientOnline_routes_1 = require("./routes/clientOnline.routes");
var company_routes_1 = require("./routes/company.routes");
var certificate_routes_1 = require("./routes/certificate.routes");
var stampBill_routes_1 = require("./routes/stampBill.routes");
var app = new koa_1.default();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(invewin_routes_1.invewinRouter.routes());
app.use(catalog_routes_1.catalogRouter.routes());
app.use(clientOnline_routes_1.clientOnlineRouter.routes());
app.use(company_routes_1.companyRouter.routes());
app.use(certificate_routes_1.certificateRouter.routes());
app.use(stampBill_routes_1.stampBillRouter.routes());
app.listen(process.env.PORT, function () {
    console.log("Server running on port http://localhost:".concat(process.env.PORT));
});
