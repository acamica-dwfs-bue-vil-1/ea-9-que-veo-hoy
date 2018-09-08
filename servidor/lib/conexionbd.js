var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', 
  port: '3306',
  user: 'root',
  password : 'acamica0',
  database : 'que_veo'
});

connection.connect();
module.exports = connection;

