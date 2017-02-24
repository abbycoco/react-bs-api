var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});
router.get('/checkuser',function (req,res,next) {
    userDao.check(req,res,next);
});
router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});
router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});
//对于用户操作，检查用户是否存在，新增用户，个人模块查看用户信息，更新用户信息。
router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});
router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});



module.exports = router;