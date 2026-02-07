
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Konekcija uspešna!');
  } catch (error) {
    console.error('Konekcija NIJE uspela:', error);
  } finally {
    await sequelize.close();
  }
})();
