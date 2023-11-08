import sequelize from "../DB/db.js";
import { DataTypes } from "sequelize";
const RestaurantCategory = sequelize.define('RestaurantCategory', {
    Rid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    Rname: {
        type: DataTypes.ENUM,
        values: ['fastfood', 'cafe', 'casual', 'finedining']
    }
});
export default RestaurantCategory;
