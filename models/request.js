const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const request = sequelize.define('requests', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    cv: DataTypes.TEXT,
    experience: DataTypes.TEXT,
    interest: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  
  request.associate = function (models) {
    request.belongsTo(models.candidates, {
      foreignKey: 'id',
      sourceKey: 'candidatesId',
    });
    
    request.belongsTo(models.jobs, {
      foreignKey: 'id',
      sourceKey: 'jobsId',
    });
  };
  return request;
};
