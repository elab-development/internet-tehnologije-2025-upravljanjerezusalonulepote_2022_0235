
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

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