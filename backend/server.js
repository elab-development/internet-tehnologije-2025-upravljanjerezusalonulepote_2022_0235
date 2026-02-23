require("dotenv").config(); 
const express = require('express'); 
const cors = require('cors');
const app = require("./app"); 
const { Sequelize } = require("sequelize");

app.use(cors());


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log
  }
);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Baza uspešno sinhronizovana");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Greška pri sinhronizaciji baze:", err);
  });