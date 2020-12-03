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

const main = async () => {
    connection.query('SELECT * FROM dev.provinces_test WHERE levelType = 2', function (error, result) {
        if (error) throw error;
        _.each(result, async (provincesLevel3) => {
            let id_original2 = _.get(provincesLevel3, 'id_original', null);
            connection.query('select * from dev.provinces_test where parentId = ?', id_original2,
                function (err, result2) {
                    if (err) throw err;
                    _.each(result2, async (db) => {
                        let id_original3 = _.get(db, 'id_original');
                        let name3 = _.get(db, 'name', null);
                        let name_translation3 = _.get(db, 'name_translation', null);
                        let parent_id3 = _.get(provincesLevel3, 'id_original');
                        let zipcode3 = _.get(db, 'zipcode', null);
                        if (zipcode3 === '') {
                            zipcode3 = 0;
                        }
                        let lat3 = _.get(db, 'lat', null);
                        let lng3 = _.get(db, 'lng', null);

                        let provinces3 = {
                            id: id_original3,
                            name_translation: name3,
                            name_original: name_translation3,
                            parent_id: parent_id3,
                            level: 3,
                            country_code: 'CN',
                            zipcode: zipcode3,
                            lat: lat3,
                            lng: lng3
                        };
                        console.log(provinces3);
                        let sql3 = 'insert into dev.provinces_dev set ?';
                        connection.query(sql3, provinces3, function (err, result) {
                            if (err) throw err;
                            console.log(' insert level 3 thanh cong');
                        });
                        console.log("---------------done--------------");
                    });
                })
        })
    });
};
main();