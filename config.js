module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'ops',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '-03:00',
  },
  production: {
    // Configurações de produção (por exemplo, usando variáveis de ambiente)
  }
};




/*module.exports = {
  development: {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql'
  },
  production: {
    // Configurações de produção (por exemplo, usando variáveis de ambiente)
  }
};*/
