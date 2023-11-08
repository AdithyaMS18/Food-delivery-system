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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_js_1 = __importDefault(require("./DB/db.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const restaurantRoutes_js_1 = __importDefault(require("./routes/restaurantRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use((0, cors_1.default)());
app.use('/api/v1/restaurant', restaurantRoutes_js_1.default);
app.use('/api/v1/user', userRoutes_js_1.default);
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_js_1.default.authenticate();
            console.log('Connection has been established successfully.');
            console.log(`Server is running on port ${port}`);
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_js_1.default.sync({ alter: true });
        console.log('Database synchronized');
    }
    catch (error) {
        console.error('Error synchronizing database:', error);
    }
    app.listen(port, () => {
        connectToDatabase();
    });
}))();
