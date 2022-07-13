const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Consumator = sequelize.define(
    "consumator",
    {
        camera: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        denumire: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categorie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
         
        },
        imagine: {
            type: DataTypes.STRING,
        },
        consum: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        pret: {
            type: DataTypes.FLOAT,
        },
        frecventaUtilizare: {
            type: DataTypes.INTEGER,
        },
        predefinit: {
            type: DataTypes.BOOLEAN,
        },
        unitateMasura:{
            type: DataTypes.STRING,
        }      
    }
);
module.exports = Consumator;