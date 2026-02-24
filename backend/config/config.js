require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "kozmetickisalon",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT) || 3306,
    dialect: "mysql"
  }
}
module.exports = sequelize;