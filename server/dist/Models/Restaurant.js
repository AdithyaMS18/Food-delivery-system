"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../DB/db"));
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const RestaurantCategory_1 = __importDefault(require("./RestaurantCategory"));
const Restaurant = db_1.default.define('Restaurant', {
    Rid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    Rname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Rlocation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Rdescription: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Rphoto: {
        type: sequelize_1.DataTypes.STRING(1200)
    },
    Uid: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: User_1.default,
            key: 'Uid'
        }
    },
    Rtype: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['VEG', 'NONVEG']
    },
    Cid: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: RestaurantCategory_1.default,
            key: 'CRid'
        }
    }
}, {});
exports.default = Restaurant;
