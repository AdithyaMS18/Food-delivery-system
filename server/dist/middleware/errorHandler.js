"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../errors/customError");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: "Something went wrong!, Please try again" });
};
exports.default = errorHandlerMiddleware;
