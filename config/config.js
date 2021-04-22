const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPW,
    database: "ins_dev",
    host: process.env.DBENDP,
    port: process.env.DBPORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
