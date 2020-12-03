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
        _.each(result, async (provincesLevel1) => {
            let id_original1 = _.get(provincesLevel1, 'id_original', null);
            let name1 = _.get(provincesLevel1, 'name', null);
            let name_translation1 = _.get(provincesLevel1, 'name_translation', null);
            let zipcode1 = _.get(provincesLevel1, 'zipcode', null);
            if (zipcode1 === '') {
                zipcode1 = 0;
            }
            let lat1 = _.get(provincesLevel1, 'lat', null);
            let lng1 = _.get(provincesLevel1, 'lng', null);

            let provinces = {
                id: id_original1,
                name_translation: name1,
                name_original: name_translation1,
                parent_id: 0,
                level: 1,
                country_code: 'CN',
                zipcode: zipcode1,
                lat: lat1,
                lng: lng1
            };
            console.log(zipcode1);
            let sql2 = 'insert into dev.provinces_dev set ?';
            connection.query(sql2, provinces, function (err, result) {
                if (err) throw err;
                console.log(' insert level 1 thanh cong');
            });
            console.log("---------------done--------------");
        })
    });
};
main();