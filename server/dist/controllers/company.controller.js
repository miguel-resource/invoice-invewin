"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var invewin_controller_1 = require("./invewin.controller");
var user_controller_1 = __importDefault(require("./user.controller"));
var http = axios_1.default.create({
    baseURL: process.env.INVEWIN_API_URL,
});
var CompanyController;
(function (CompanyController) {
    function authCompany(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, userNameRoute, user, company;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, password = _a.password;
                        userNameRoute = userName.replace("@", "%40");
                        return [4 /*yield*/, user_controller_1.default.getUser(userNameRoute)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, invewin_controller_1.InvewinController.authCustom(password, userName, user.empresaId).then(function (data) {
                                ctx.body = data;
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getCompany(user.empresaId)];
                    case 3:
                        company = _b.sent();
                        ctx.status = 200;
                        ctx.body = company.data;
                        return [2 /*return*/];
                }
            });
        });
    }
    CompanyController.authCompany = authCompany;
    function getCompany(companyID) {
        return __awaiter(this, void 0, void 0, function () {
            var accesToken, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, invewin_controller_1.InvewinController.auth()];
                    case 1:
                        accesToken = _a.sent();
                        return [4 /*yield*/, http.get(process.env.INVEWIN_API_URL + "/empresas/" + companyID, {
                                headers: {
                                    Authorization: "Bearer ".concat(accesToken),
                                },
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    CompanyController.getCompany = getCompany;
    function getCompanyEmisor(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userName, userNameRoute, user, company;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userName = ctx.request.body.userName;
                        userNameRoute = userName.replace("@", "%40");
                        return [4 /*yield*/, user_controller_1.default.getUser(userNameRoute)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, getCompany(user.empresaId)];
                    case 2:
                        company = _a.sent();
                        ctx.status = 200;
                        ctx.body = company.data;
                        return [2 /*return*/];
                }
            });
        });
    }
    CompanyController.getCompanyEmisor = getCompanyEmisor;
    function updateCompany(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, company, userName, password, userNameRoute, user, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, company = _a.company, userName = _a.userName, password = _a.password;
                        userNameRoute = userName.replace("@", "%40");
                        return [4 /*yield*/, user_controller_1.default.getUser(userNameRoute)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, invewin_controller_1.InvewinController.authCustom(password, userName, user.empresaId)];
                    case 2:
                        accessToken = _b.sent();
                        // const accessToken = await InvewinController.auth();
                        return [4 /*yield*/, http
                                .put(process.env.INVEWIN_API_URL + "/empresas/emisor/" + user.empresaId, company, {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })
                                .then(function (response) {
                                ctx.status = response.status;
                            })
                                .catch(function (err) {
                                console.log("ERROR", err.response.data);
                                ctx.status = err.response.status;
                            })];
                    case 3:
                        // const accessToken = await InvewinController.auth();
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    CompanyController.updateCompany = updateCompany;
    function getInvoices(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, userNameRoute, user, accessToken, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ctx.request.body, userName = _a.userName, password = _a.password;
                        userNameRoute = userName.replace("@", "%40");
                        return [4 /*yield*/, user_controller_1.default.getUser(userNameRoute)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, invewin_controller_1.InvewinController.authCustom(password, userName, user.empresaId)];
                    case 2:
                        accessToken = _b.sent();
                        return [4 /*yield*/, http.get(process.env.INVEWIN_API_URL +
                                "/empresas/" +
                                user.empresaId +
                                "/documentoscfd", {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })];
                    case 3:
                        data = _b.sent();
                        ctx.status = 200;
                        ctx.body = data.data;
                        return [2 /*return*/];
                }
            });
        });
    }
    CompanyController.getInvoices = getInvoices;
})(CompanyController || (CompanyController = {}));
exports.default = CompanyController;
