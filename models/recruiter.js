const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Recruiter = sequelize.define('recruiters', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: DataTypes.STRING,   
    company_name: DataTypes.STRING,
    logo: DataTypes.STRING,
    company_website: DataTypes.STRING,
    administrator_email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.TEXT,
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
  
  Recruiter.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Recruiter;
};