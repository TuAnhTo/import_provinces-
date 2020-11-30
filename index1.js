const mysql = require('mysql');
const _  = require('lodash');


const  connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'tu2anhto',
        database: 'dev'
    }
);
connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});
connection.query('SELECT * FROM dev.provinces_test WHERE levelType = 1', function (err, result, fields) {
    if (err) throw err;
    console.log(result)
});


// let id_original2 = _.map(result, 'id_original');
// let name2 = _.map(result, 'name_translation');
// let name_translation2 = _.map(result, 'name_original');
// let zipcode2 = _.map(result, 'zipcode', 0);
// let lat2 = _.map(result, 'lat');
// let lng2 = _.map(result, 'lng');
//
//
//
// let provinces = {
//     id: id_original2,
//     name_translation : name2,
//     name_original: name_translation2,
//     parent_id : 0,
//     level : 1,
//     country_code : 'CN',
//     zipcode : zipcode2,
//     lat : lat2,
//     lng: lng2
// };
//
//
// console.log(provinces);
//
// let sql = 'insert into dev.provinces_dev set ?';
