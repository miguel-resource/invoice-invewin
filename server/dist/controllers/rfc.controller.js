"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRfc = void 0;
var validate_rfc_1 = __importDefault(require("validate-rfc"));
var isValidRfc = function (rfc) {
    var result = (0, validate_rfc_1.default)(rfc);
    return result;
};
exports.isValidRfc = isValidRfc;
