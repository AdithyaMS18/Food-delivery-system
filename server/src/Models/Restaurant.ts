import sequelize from "../DB/db";
import {  DataTypes } from "sequelize";
import User from "./User";
import RestaurantCategory from "./RestaurantCategory";


const Restaurant = sequelize.define('Restaurant', {
    Rid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    Rname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Rlocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     Rdescription:{
        type: DataTypes.STRING,
        allowNull: false
     },
     rating:{
        type: DataTypes.INTEGER,
      
     },
     Rphoto:{
        type: DataTypes.STRING(1200) 
     },
     Uid:{
        type: DataTypes.UUID,
        references: {
         model: User,
         key: 'Uid'
       }
     },
     Rtype:{
         type:DataTypes.ENUM,
         values: ['VEG', 'NONVEG']
     },
     Cid:{
        type: DataTypes.INTEGER,
        references: {
         model: RestaurantCategory,
         key: 'CRid'
       }
       
     }
  }, {
   
  });

  
  export default Restaurant