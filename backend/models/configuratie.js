const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Configuratie = sequelize.define(
    "configuratie",
    {
        denumire: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        furnizorEnergie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pretEnergie: {
            type: DataTypes.FLOAT,
        }, 

      

                        
    }
);
module.exports = Configuratie;