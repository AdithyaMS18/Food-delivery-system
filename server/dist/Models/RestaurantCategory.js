"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../DB/db"));
const sequelize_1 = require("sequelize");
const RestaurantCategory = db_1.default.define('RestaurantCategory', {
    Rid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    Rname: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['fastfood', 'cafe', 'casual', 'finedining']
    }
});
exports.default = RestaurantCategory;
