require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = require("./app");
const { Sequelize } = require("sequelize");

app.use(cors());

if (!process.env.MYSQL_URL) {
  console.error(" MYSQL_URL nije definisan u environment varijablama!");
  process.exit(1);
}


const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: console.log,
});

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Baza uspešno sinhronizovana");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Greška pri sinhronizaciji baze:", err);
  });