'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addConstraint('Appointments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_appointments_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Appointments', {
      fields: ['scheduleId'],
      type: 'foreign key',
      name: 'fk_appointments_schedule',
      references: {
        table: 'Schedules',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Schedules', {
      fields: ['makeupArtistId'],
      type: 'foreign key',
      name: 'fk_schedules_artist',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

   
    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_user_email'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_user');
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_schedule');
    await queryInterface.removeConstraint('Schedules', 'fk_schedules_artist');
    await queryInterface.removeConstraint('Users', 'unique_user_email');
  }
};