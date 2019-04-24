/*
 *
 */

const mysql = require('mysql');
// const { createPool } = require('mysql');

const mysqlHost = process.env.MYSQL_HOST;
const mysqlPort = process.env.MYSQL_PORT || 3306;
const mysqlDBName = process.env.MYSQL_DB_NAME;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const mysqlPool = mysql.createPool({
  connectionLimit: 10,
  host: mysqlHost,
  port: mysqlPort,
  database: mysqlDBName,
  user: mysqlUser,
  password: mysqlPassword
});

module.exports = mysqlPool;
