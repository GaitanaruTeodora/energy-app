const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Email = sequelize.define(
    "email",
    {
        cod: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },
        email: {
            type: DataTypes.STRING,
        },

        mesaj : {
            type: DataTypes.STRING,
        },
      
        isValid: {
            type: DataTypes.BOOLEAN,
        },
       
    }
);
module.exports = Email;