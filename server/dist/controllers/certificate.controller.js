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
var user_controller_1 = __importDefault(require("./user.controller"));
var invewin_controller_1 = require("./invewin.controller");
var crypto_js_1 = __importDefault(require("crypto-js"));
var http = axios_1.default.create({
    baseURL: process.env.INVEWIN_API_URL,
});
var CerfificatesController;
(function (CerfificatesController) {
    function getCertificates(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, userNameRoute, user, accessToken, data, certificate, privateKey, passwordCertificateDecrypted;
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
                        return [4 /*yield*/, http
                                .get(process.env.INVEWIN_API_URL +
                                "/empresas/" +
                                user.empresaId +
                                "/certificadoscsd", {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })
                                .catch(function (error) {
                                console.log("ERROR", error.response.data);
                                console.log("ERROR INFO", error.response.data.codigoEstatus);
                                ctx.throw(error.response.data.codigoEstatus, error.response.data.mensaje);
                                return;
                            })
                                .then(function (response) {
                                return response;
                            })];
                    case 3:
                        data = _b.sent();
                        if (data === undefined) {
                            ctx.status = 400;
                            ctx.body = { message: "Error" };
                            return [2 /*return*/];
                        }
                        certificate = Buffer.from(data.data[0].certificado, "base64");
                        privateKey = Buffer.from(data.data[0].llavePrivada, "base64");
                        data.data[0].certificado = certificate;
                        data.data[0].llavePrivada = privateKey;
                        passwordCertificateDecrypted = crypto_js_1.default.AES.decrypt(data.data[0].password, process.env.CERTIFICATES_SECRET || "").toString(crypto_js_1.default.enc.Utf8);
                        data.data[0].password = passwordCertificateDecrypted.replace(/[^a-zA-Z0-9]/g, "");
                        ctx.status = 200;
                        ctx.body = data.data;
                        return [2 /*return*/];
                }
            });
        });
    }
    CerfificatesController.getCertificates = getCertificates;
    function postCertificates(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, passwordCertificate, serieInvoice, folioInvoice, userName, password, _b, certificate, privateKey, certificateBase64, privateKeyBase64, user, accessToken, passwordCertificateEncrypted;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.request.body, passwordCertificate = _a.passwordCertificate, serieInvoice = _a.serieInvoice, folioInvoice = _a.folioInvoice, userName = _a.userName, password = _a.password;
                        _b = ctx.request.files, certificate = _b.certificate, privateKey = _b.privateKey;
                        certificateBase64 = certificate[0].buffer.toString("base64");
                        privateKeyBase64 = privateKey[0].buffer.toString("base64");
                        return [4 /*yield*/, user_controller_1.default.getUser(userName)];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, invewin_controller_1.InvewinController.authCustom(password, userName, user.empresaId)];
                    case 2:
                        accessToken = _c.sent();
                        passwordCertificateEncrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(passwordCertificate), process.env.CERTIFICATES_SECRET || "").toString();
                        console.log("PASSWORD ENCRYPTED", passwordCertificateEncrypted);
                        return [4 /*yield*/, http
                                .post(process.env.INVEWIN_API_URL +
                                "/empresas/" +
                                user.empresaId +
                                "/certificadoscsd", {
                                serieFacturacion: serieInvoice,
                                folioFacturacion: parseInt(folioInvoice),
                                empresaId: user.empresaId,
                                certificado: certificateBase64,
                                llavePrivada: privateKeyBase64,
                                password: passwordCertificateEncrypted,
                            }, {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })
                                .catch(function (error) {
                                console.log("ERROR INFO", error.response);
                                console.log("ERROR", error.response.data);
                            })
                                .then(function (response) {
                                console.log("RESPONSE", response);
                                ctx.status = 200;
                            })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    CerfificatesController.postCertificates = postCertificates;
    function updateCertificates(ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, passwordCertificate, serieInvoice, folioInvoice, userName, password, id, _b, certificate, privateKey, user, accessToken, getCertificate, certificateBase64, privateKeyBase64, passwordCertificateEncrypted;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = ctx.request.body, passwordCertificate = _a.passwordCertificate, serieInvoice = _a.serieInvoice, folioInvoice = _a.folioInvoice, userName = _a.userName, password = _a.password, id = _a.id;
                        _b = ctx.request.files, certificate = _b.certificate, privateKey = _b.privateKey;
                        return [4 /*yield*/, user_controller_1.default.getUser(userName)];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, invewin_controller_1.InvewinController.authCustom(password, userName, user.empresaId)];
                    case 2:
                        accessToken = _c.sent();
                        return [4 /*yield*/, http.get(process.env.INVEWIN_API_URL + "/empresas/" + user.empresaId
                                + "/certificadoscsd", {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            }).then(function (response) {
                                return response.data[0];
                            })];
                    case 3:
                        getCertificate = _c.sent();
                        certificateBase64 = certificate ? certificate[0].buffer.toString("base64") : getCertificate.certificado;
                        privateKeyBase64 = privateKey ? privateKey[0].buffer.toString("base64") : getCertificate.llavePrivada;
                        console.log("CERTIFICATE", certificateBase64);
                        console.log("PRIVATE KEY", privateKeyBase64);
                        passwordCertificateEncrypted = crypto_js_1.default.AES.encrypt(JSON.stringify(passwordCertificate), process.env.CERTIFICATES_SECRET || "").toString();
                        return [4 /*yield*/, http
                                .put(process.env.INVEWIN_API_URL +
                                "/empresas/" +
                                user.empresaId +
                                "/certificadoscsd/" +
                                id, {
                                serieFacturacion: serieInvoice ? serieInvoice : getCertificate.serieFacturacion,
                                folioFacturacion: parseInt(folioInvoice) ? parseInt(folioInvoice) : getCertificate.folioFacturacion,
                                empresaId: user.empresaId ? user.empresaId : getCertificate.empresaId,
                                certificado: certificateBase64,
                                llavePrivada: privateKeyBase64,
                                password: passwordCertificateEncrypted ? passwordCertificateEncrypted : getCertificate.password,
                            }, {
                                headers: {
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })
                                .catch(function (error) {
                                console.log("ERROR INFO", error.response);
                                console.log("ERROR", error.response.data);
                            })
                                .then(function (response) {
                                console.log("RESPONSE", response);
                                ctx.status = 200;
                            })];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    CerfificatesController.updateCertificates = updateCertificates;
})(CerfificatesController || (CerfificatesController = {}));
exports.default = CerfificatesController;
