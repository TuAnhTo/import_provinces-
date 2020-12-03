const mysql = require('mysql');
const _ = require('lodash');


const connection = mysql.createConnection(
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
const main = async () => {
    let sql = 'SELECT * FROM dev.provinces_test WHERE levelType = 1';
    connection.query(sql, function (error, result) {
        if (error) throw error;
        // console.log(result);
        _.each(result, async (provincesLevel1) => {
            let id_original2 = _.get(provincesLevel1, 'id_original');
            let name2 = _.get(provincesLevel1, 'name');
            let name_translation2 = _.get(provincesLevel1, 'name_translation');
            let zipcode2 = _.get(provincesLevel1, 'zipcode', 0);
            if (zipcode2 === '') {
                zipcode2 = 0;
            }
            let lat2 = _.get(provincesLevel1, 'lat');
            let lng2 = _.get(provincesLevel1, 'lng');

            let provinces = {
                id: id_original2,
                name_translation: name2,
                name_original: name_translation2,
                parent_id: 0,
                level: 1,
                country_code: 'CN',
                zipcode: zipcode2,
                lat: lat2,
                lng: lng2
            };
            console.log(zipcode2);
            let sql2 = 'insert into dev.provinces_dev set ?';
            connection.query(sql2, provinces, function (err, result) {
                if (err) throw err;
                console.log(' insert level 1 thanh cong');
            });
        })
    });
};
main();