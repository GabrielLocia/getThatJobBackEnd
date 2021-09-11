'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('jobs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      recruiterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recruiters',
          key: 'id'
        }
      },
      title: Sequelize.STRING,
      type: Sequelize.STRING,
      seniority: Sequelize.STRING,
      location: Sequelize.TEXT,
      introduccion: Sequelize.TEXT,
      expected: Sequelize.TEXT,
      lokkin: Sequelize.TEXT,
      requirements: Sequelize.TEXT,
      description:Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('jobs');
  }
};
