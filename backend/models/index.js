const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); 
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    if (model.init) {
        model.init(model.rawAttributes, { sequelize, modelName: model.name });
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { db[modelName].associate(db); }
});

db.sequelize = sequelize;
module.exports = db;