'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('candidates', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      professionalId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'professionals',
          key: 'id'
        }
      },
      fullname: Sequelize.STRING,
      phone: Sequelize.STRING,
      description: Sequelize.STRING,
      experience: Sequelize.TEXT,
      linkdinurl: Sequelize.TEXT,
      githuburl: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('candidates');
  }
};
