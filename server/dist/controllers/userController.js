var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createCustomError } from "../errors/customError.js";
import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
const createJWT = (user) => {
    return jwt.sign({ userId: user._id, Uname: user.Uname }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
export const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract required details from the body of the Request
        const { name, email, password } = req.body;
        // Check whether the user has provided all the values and if all values are not provided, throw an error
        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }
        // Check whether the user already exists, and if the email is already registered, throw an error
        const userExists = yield User.findOne({ where: { Uemail: email  } });
        if (userExists) {
            return next(createCustomError("User already exists", 400));
        }
        // Then store the user in the database
        const user = yield User.create({ Uname: name, Uemail: email, Upassword: password });
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
