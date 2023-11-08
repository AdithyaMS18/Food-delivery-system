import sequelize from "../DB/db";
import {  Op, Model, DataTypes } from "sequelize";
import useBcrypt from "sequelize-bcrypt"

const User = sequelize.define('User', {
    Uid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
    },
    Uname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Uemail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      },
      unique: true
    },
     Upassword:{
        type: DataTypes.STRING,
        allowNull: false
     },
     Uaddress:{
        type: DataTypes.STRING,
      
     },
     Uphoto:{
        type: DataTypes.STRING(1200) 
     }
  }, {
   
  });

  

  useBcrypt(User, {
    field: 'Upassword', 
    rounds: 12, 
    compare: 'authenticate',
  });
  
  export default User