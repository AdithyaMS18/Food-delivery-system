var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import 'dotenv/config';
import sequelize from './DB/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import restaurantRouter from './routes/restaurantRoutes.js';
import { signUp } from './controllers/userController.js';
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());
app.use('/api/v1/restaurant', restaurantRouter);
app.post('/api/v1/signup', signUp);
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
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
        yield sequelize.sync({ alter: true });
        console.log('Database synchronized');
    }
    catch (error) {
        console.error('Error synchronizing database:', error);
    }
    app.listen(port, () => {
        connectToDatabase();
    });
}))();
