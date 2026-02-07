const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Service extends Model {}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Service",
  timestamps: true
});

module.exports = Service;