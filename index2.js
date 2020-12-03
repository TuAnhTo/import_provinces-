const mysql = require('mysql');
const _ = require('lodash');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu2anhto',
    database: 'dev'
});

connection.connect((error)=>{
   if (error) {
       console.log(error);
   } else {
       console.log("db connected")
   }
});

connection.query('SELECT * FROM dev.provinces_test WHERE levelType = 2', function (err, result) {
    if (err) throw err;
    console.log(result)
});

