//mysql 모듈 소환
const mariadb = require('mysql2');

// create the connection to database
const connection = mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password : 'root',
    database: 'Bookshop',
    dateStrings : true
  });

module.exports = connection;

  