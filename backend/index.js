"use strict"

// Express Initialisation
const express = require("express");
const app = express()

const cors = require('cors');
app.use(cors())

// Sequelize Initialisation
const sequelize = require("./sequelize")

// Import created models
const Utilizator = require("./models/utilizator");
const Configuratie = require("./models/configuratie");
const Consumator = require("./models/consumator")

// Define the model relationship.
Utilizator.hasMany(Configuratie);
Configuratie.hasMany(Consumator);


// Express middleware
app.use(
    express.urlencoded({
      limit:"500mb",
      extended: true,
    })
);

app.use(express.json({limit: '500mb'}));


// Import routes
const utilizatoriRouter = require("./routes/utilizatori");
const configuratiiRouter = require("./routes/configuratii")
const camereRouter = require("./routes/camere")
const consumatoriRouter = require('./routes/consumatori')

// Middlewares pentru rute
app.use("/api", utilizatoriRouter)
app.use("/api",configuratiiRouter)
app.use("/api",camereRouter)
app.use("/api",consumatoriRouter)

app.listen(3000, async()=>{
    console.log("Server started on http://localhost:3000");
    try{
      await sequelize.authenticate();
      console.log("Connection has been established successfully")
    } catch(err){
      console.err("Unable to connect to the database", error)
    }
});