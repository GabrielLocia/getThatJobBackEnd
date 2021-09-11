const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Professional = sequelize.define('professionals', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: (professional) => {
        const salt = bcrypt.genSaltSync();
        professional.password = bcrypt.hashSync(professional.password, salt);
      },
    },
  });
  
  Professional.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Professional;
};