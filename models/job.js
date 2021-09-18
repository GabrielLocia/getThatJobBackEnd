const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const job = sequelize.define('jobs', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    recruiterId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'recruiters',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    seniority: DataTypes.STRING,
    salary: DataTypes.STRING,
    location: DataTypes.TEXT,
    introduccion: DataTypes.TEXT,
    expected: DataTypes.TEXT,
    lokkin: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  job.associate = function (models) {

    job.hasMany(models.requests, {
      foreignKey: 'jobsId',
      sourceKey: 'id',
    });
  };

  return job;
};
