const mysql = require('mysql');
const _ = require('lodash');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu2anhto',
    database: 'dev'
});
connection.connect((error)=> {
    if (error) {
        console.log(error);
    }
    else {
        console.log("db connected")
    }
});

const  main  = async () => {
    let sql = 'select * from dev.provinces_test where  levelType = 3 ';
    connection.query(sql, function (error, result) {
        if (error)  throw error;
        // console.log(result);
        _.each(result, async (provincesLevel3)=> {
            let a = _.get(provincesLevel3 , 'lng');
            console.log(a);
        })
    });
};
main();