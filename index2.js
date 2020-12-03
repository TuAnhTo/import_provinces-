const mysql = require('mysql');
const _ = require('lodash');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu2anhto',
    database: 'dev'
});

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("db connected")
    }
});

connection.query('SELECT * FROM dev.provinces_test WHERE levelType = 1', function (err, result) {
    if (err) throw err;
    _.each(result, async (provincesLevel2) => {
        let id_original1 = _.get(provincesLevel2, 'id_original', null);
        connection.query('SELECT * FROM dev.provinces_test WHERE parentId = ?', id_original1,
            function (err, result2) {
                if (err) throw err;
                _.each(result2, async (db) => {
                    let id_original2 = _.get(db, 'id_original');
                    let name2 = _.get(db, 'name', null);
                    let name_translation2 = _.get(db, 'name_translation', null);
                    let parent_id2 = _.get(provincesLevel2, 'id_original');
                    let zipcode2 = _.get(db, 'zipcode', null);
                    if (zipcode2 === '') {
                        zipcode2 = 0;
                    }
                    let lat2 = _.get(db, 'lat', null);
                    let lng2 = _.get(db, 'lng', null);
                    let provinces2 = {
                        id: id_original2,
                        name_translation: name2,
                        name_original: name_translation2,
                        parent_id: parent_id2,
                        level: 2,
                        country_code: 'CN',
                        zipcode: zipcode2,
                        lat: lat2,
                        lng: lng2
                    };
                    console.log(provinces2);

                    let sql2 = 'insert into dev.provinces_dev set ?';
                    connection.query(sql2, provinces2, function (err, result) {
                        if (err) throw err;
                        console.log(' insert level 2 thanh cong');
                    });
                    console.log("---------------done--------------");
                });
            });
    });
});

