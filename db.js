const { Sequelize } = require('sequelize');

const Professional = require('./models/professional');
const Recreuiter = require('./models/recruiter');
const Candidate = require('./models/candidate');
const Job = require('./models/job');
const Request = require('./models/request');


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DIALECT,
  logging: false,
});

const models = [Professional, Recreuiter, Candidate, Job,Request];

for (let model of models) {
  model(sequelize);
}

const { professionals, candidates } = sequelize.models;
candidates.belongsTo(professionals);

const { recruiters, jobs,requests } = sequelize.models;
recruiters.hasMany(jobs);
jobs.belongsTo(recruiters);


candidates.hasMany(requests);
requests.belongsTo(candidates);

jobs.hasMany(requests);
requests.belongsTo(jobs);

module.exports = sequelize;
