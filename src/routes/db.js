const Sequelize = require('sequelize');

// Use as variáveis de ambiente fornecidas pelo Railway para configurar a conexão com o banco de dados
const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  dialect: 'mysql',
});

sequelize.options.define.ModelNamePlural = true;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
