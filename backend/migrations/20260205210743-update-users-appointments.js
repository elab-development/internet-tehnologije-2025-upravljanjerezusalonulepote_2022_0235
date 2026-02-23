'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users');
    if (!tableInfo.phone) {
      await queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

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