"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.createCustomError = void 0;
class CustomError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const createCustomError = (msg, statusCode) => {
    return new CustomError(msg, statusCode);
};
exports.createCustomError = createCustomError;
