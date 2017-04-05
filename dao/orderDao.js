/**
 * Created by benben on 17/4/1.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./orders');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var endplace=req.body.endplace;
            var startplace=req.body.startplace;
            var price= +req.body.price;
            var description=req.body.description;
            var ridetype=req.body.ridetype;
            var Date=req.body.Date;
            var detailDate=req.body.detailDate;
            var usertel=req.body.usertel;
            console.log(endplace,startplace,price,description,ridetype,Date,detailDate)
            // var phone = +req.query.phone; // 为了拼凑正确的sql语句，这里要转下整数
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [endplace,startplace,price,description,ridetype,Date,detailDate,usertel], function (err, result) {
               if(err === null){
                   result={
                       code: 200,
                       msg: '增加成功'
                   }
               }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    }

};