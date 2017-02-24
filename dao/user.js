// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(name, phone, password) VALUES(?,?,?)',
    update:'update user set name=?, password=? where phone=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where phone=?',
    queryAll: 'select * from user'
};

module.exports = user;