'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('candidatesJobs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      candidatesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidates',
          key: 'id'
        }
      },
      jobsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jobs',
          key: 'id'
        }
      },
      cv: Sequelize.TEXT,
      experience: Sequelize.TEXT,
      interest: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.dropTable('candidatesJobs');
  }
};
