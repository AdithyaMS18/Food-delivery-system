"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../DB/db"));
const sequelize_1 = require("sequelize");
const sequelize_bcrypt_1 = __importDefault(require("sequelize-bcrypt"));
const User = db_1.default.define('User', {
    Uid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    Uname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Uemail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        },
        unique: true
    },
    Upassword: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Uaddress: {
        type: sequelize_1.DataTypes.STRING,
    },
    Uphoto: {
        type: sequelize_1.DataTypes.STRING(1200)
    }
}, {});
(0, sequelize_bcrypt_1.default)(User, {
    field: 'Upassword',
    rounds: 12,
    compare: 'authenticate',
});
exports.default = User;
