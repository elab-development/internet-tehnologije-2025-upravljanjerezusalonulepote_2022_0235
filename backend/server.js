require("dotenv").config(); 
const express = require('express'); 
const cors = require('cors');
const app = require("./app"); 
const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: isProduction ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}, 
    logging: isProduction ? false : console.log
  }
);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false })
  .then(() => {
    console.log(`✅ Baza sinhronizovana (${isProduction ? 'PRODUKCIJA' : 'LOKAL'})`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Greška:", err);
  });