const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Schedule = require("../models/schedule");
const Service = require("./service");

class Appointment extends Model {}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Schedule,
      key: "id"
    }
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Service,
      key: "id"
    }
  },
  status: {
    type: DataTypes.ENUM("PENDING", "CONFIRMED", "CANCELED"),
    defaultValue: "PENDING"
  }
}, {
  sequelize,
  modelName: "Appointment",
  timestamps: true
});

module.exports = Appointment;