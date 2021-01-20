var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'shop'
}, 'single');

connection.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log("con to db");
});

module.exports = connection;