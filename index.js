const mysql = require('mysql');
const fs = require('fs');
const csv = require('csv-parser');
const _ = require('lodash');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu2anhto',
    database: 'dev'
});


connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});


fs.createReadStream('provinces-china.csv', 'utf8')
    .pipe(csv())
    .on('data', function (row) {


        let id_original1 = row.ID;
        let name1 = row.Name;
        let name_translation1 = row.山西;
        let parentId1 = row.ParentId;
        let shortName1 = row.ShortName;
        let levelType1 = row.LevelType;
        let cityCode1 = row.CityCode;
        let zipcode1 = row.ZipCode;
        let lat1 = row.Lat;
        let lng1 = row.lng;

        let provinces = {
            id_original: id_original1,
            name: name1,
            name_translation: name_translation1,
            parentId: parentId1,
            shortName: shortName1,
            levelType: levelType1,
            cityCode: cityCode1,
            zipcode: zipcode1,
            lat: lat1,
            lng: lng1

        };
        let sql = 'insert into dev.provinces_test set ?';
        connection.query(sql, provinces)
    })
    .on('end', function () {
        console.log("thanh cong");
    });


// Anh Anh Tuấn, [1 Oct 2020 at 22:01:19]:
// 1- Lưu dữ liệu tất cả vào 1 bảng tạm, thêm cột trạng thái đánh dấu scan rồi hay chưa
// 2- Scan lần lượt lấy hết thằng level 1, scan xong dừng
// 3- Chạy lấy ra 1 thằng LEVEL 1, ID gốc trên file excel bao nhiêu >>> đọc vào bảng tạm xem thằng nào có parentID , đưa ra, lấy hết rồi thì lưu lại trạng thái thằng LEVEL 1 đã scan
//
// 4- Chạy hết LEVEl 1, mới cho chạy level 2