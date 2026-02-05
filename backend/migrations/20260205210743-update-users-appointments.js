'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`
      ALTER TABLE Users
      ADD COLUMN IF NOT EXISTS phone VARCHAR(255);
    `);

  
    await queryInterface.changeColumn('Appointments', 'status', {
      type: Sequelize.ENUM("PENDING", "CONFIRMED", "CANCELED", "RESCHEDULED"),
      defaultValue: "PENDING"
    });
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Users', 'phone');

    
    await queryInterface.changeColumn('Appointments', 'status', {
      type: Sequelize.ENUM("PENDING", "CONFIRMED", "CANCELED"),
      defaultValue: "PENDING"
    });
  }
};