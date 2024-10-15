//mysql 모듈 소환
const mariadb = require('mysql2/promise');

// create the connection to database
const connection = async() =>{ 
  const conn = mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password : 'root',
    database: 'Bookshop',
    dateStrings : true
  });
  return conn;
}

module.exports = connection;

  