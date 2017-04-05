/**
 * Created by benben on 17/4/1.
 */
var orders = {
    insert:'INSERT INTO `order` (`endPlace`,`startPlace`,`price`,`description`,`ridetype`,`ridetime`,`detailDate`,`usertel`) VALUES(?,?,?,?,?,?,?,?)',
    update:'update user set name=?, password=? where phone=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where phone=?',
    loginin: 'select * from user where phone=? and password=?',
    queryAll: 'select * from user'
};

module.exports = orders;