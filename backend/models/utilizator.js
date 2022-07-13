const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Utilizator = sequelize.define(
    "utilizator",
    {
        nume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                isEmail: true
            }
        },
        parola: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
               
    }
);
module.exports = Utilizator;