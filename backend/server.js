require("dotenv").config(); 
const express = require('express'); 
const cors = require('cors');
const app = require("./app"); 
const { sequelize } = require("./models");

app.use(cors());

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