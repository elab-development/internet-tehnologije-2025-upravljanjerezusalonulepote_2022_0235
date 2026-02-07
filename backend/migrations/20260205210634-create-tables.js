'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM("ADMIN", "MAKEUP_ARTIST", "CLIENT"), allowNull: false },
      phone: { type: Sequelize.STRING },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

   
    await queryInterface.createTable('Services', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      duration: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

   
    await queryInterface.createTable('Schedules', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      makeupArtistId: { type: Sequelize.INTEGER, allowNull: false },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      startTime: { type: Sequelize.TIME, allowNull: false },
      endTime: { type: Sequelize.TIME, allowNull: false },
      isAvailable: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    
    await queryInterface.createTable('Appointments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      scheduleId: { type: Sequelize.INTEGER, allowNull: false },
      serviceId: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM("PENDING", "CONFIRMED", "CANCELED"), defaultValue: "PENDING" },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

   
    await queryInterface.createTable('Notifications', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      type: { type: Sequelize.STRING, allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      sentAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
    await queryInterface.dropTable('Appointments');
    await queryInterface.dropTable('Schedules');
    await queryInterface.dropTable('Services');
    await queryInterface.dropTable('Users');
  }
};