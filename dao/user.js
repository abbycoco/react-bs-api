// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(name, phone, password) VALUES(?,?,?)',
    update:'update user set name=?, password=? where phone=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where phone=?',
    loginin: 'select * from user where phone=? and password=?',
    queryAll: 'select * from user'
};

module.exports = user;