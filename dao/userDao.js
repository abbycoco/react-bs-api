// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./user');

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
            var param = req.query || req.params;
            var phone = +req.query.phone; // 为了拼凑正确的sql语句，这里要转下整数
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.name, param.phone, param.password], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function (err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if (param.name == null || param.age == null || param.password == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function (err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.password], function (err, result) {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail', {
                        result: result
                    });
                }

                connection.release();
            });
        });

    },
    login: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.loginin, [req.query.phone, req.query.password], function (err, result) {
                console.log('result', result)
                var sendresult='';
                if (result.length === 0) {
                    sendresult = {
                        code: 401,
                        msg: '该用户不存在或者密码错误'
                    };
                }
                else {
                    sendresult = {
                        code: 200,
                        msg: '登陆成功',
                        result: result
                    };
                }
                jsonWrite(res, sendresult);
                connection.release();
            });
        });

    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                jsonWrite(res, result);
                console.log(result);
                connection.release();
            });
        });
    },
    check: function (req, res, next) {
        var phone = +req.query.phone; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryById, phone, function (err, result) {
                console.log('result', result)
                if (result.length === 0) {
                    result = {
                        code: 200,
                        msg: '尚未注册'
                    };
                }
                else {
                    result = {
                        code: 401,
                        msg: '已经注册'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    }

};