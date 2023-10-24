const Sequelize = require('sequelize');
const config = require('./../../config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
  }
);


sequelize.options.define.ModelNamePlural = true;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully.');

    // Sincronize os modelos com o banco de dados
    sequelize.sync()
      .then(() => {
        console.log('Database synchronized');
      })
      .catch((error) => {
        console.error('Database synchronization error:', error);
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
