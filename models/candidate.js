const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const candidate = sequelize.define('candidates', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    professionalId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'professionals',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    description: DataTypes.STRING,
    experience: DataTypes.TEXT,
    linkdinurl: DataTypes.TEXT,
    githuburl: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  candidate.associate = function (models) {
    candidate.hasMany(models.requests, {
      foreignKey: 'candidateId',
      sourceKey: 'id',
    });
  };

  return candidate;
};
