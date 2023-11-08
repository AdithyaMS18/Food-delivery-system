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
exports.loginRestaurant = exports.registerRestaurant = void 0;
const Restaurant_1 = __importDefault(require("../Models/Restaurant"));
const customError_1 = require("../errors/customError");
const registerRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, location, cid, profilePhoto } = req.body;
    // const {userId} = req.params
    if (!name || !description || !location || !cid) {
        return next((0, customError_1.createCustomError)("Please provide all values", 400));
    }
    try {
        const restaurant = yield Restaurant_1.default.create({ Rname: name, Rlocation: location, Rdescription: description, Rphoto: profilePhoto, Uid: 1, Cid: cid });
        res.status(201).json(restaurant);
    }
    catch (error) {
        next(error);
    }
});
exports.registerRestaurant = registerRestaurant;
const loginRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.loginRestaurant = loginRestaurant;
