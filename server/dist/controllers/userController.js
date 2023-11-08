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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const customError_1 = require("../errors/customError");
const User_1 = __importDefault(require("../Models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJWT = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id, Uname: user.Uname }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract required details from the body of the Request
        const { name, email, password } = req.body;
        // Check whether the user has provided all the values and if all values are not provided, throw an error
        if (!name || !email || !password) {
            return next((0, customError_1.createCustomError)("Please provide all values", 400));
        }
        // Check whether the user already exists, and if the email is already registered, throw an error
        const userExists = yield User_1.default.findOne({ where: { Uemail: email } });
        if (userExists) {
            return next((0, customError_1.createCustomError)("User already exists", 400));
        }
        // Then store the user in the database
        const user = yield User_1.default.create({ Uname: name, Uemail: email, Upassword: password });
        // Create a unique token for each user (required for frontend authorization)
        const token = createJWT(user);
        // Send the required data (password is not required) to the frontend
        res.status(201).json({
            user,
            token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract required details from the body of the Request
        const { email, password } = req.body;
        // Check whether the user has provided all the values and if all values are not provided, throw an error
        if (!email || !password) {
            return next((0, customError_1.createCustomError)("Please provide all values", 400));
        }
        const user = yield User_1.default.findOne({ where: { Uemail: email } });
        if (!user) {
            return next((0, customError_1.createCustomError)("User does not exists", 400));
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.dataValues.Upassword);
        if (!isPasswordCorrect) {
            return next((0, customError_1.createCustomError)("Incorrect password", 400));
        }
        else {
            const token = createJWT(user);
            // Send the required data (password is not required) to the frontend
            res.status(201).json({
                user,
                token
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
