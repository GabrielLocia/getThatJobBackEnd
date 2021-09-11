'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('recruiters', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      company_name: Sequelize.STRING,
      logo: Sequelize.STRING,
      company_website: Sequelize.STRING,
      administrator_email: Sequelize.STRING,
      password: Sequelize.STRING,
      description: Sequelize.TEXT,
      type: Sequelize.STRING,
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
     await queryInterface.dropTable('recruiters');
  }
};
