/**
 * Created by benben on 17/4/1.
 */
var express = require('express');
var router = express.Router();
var orderDao = require('../dao/orderDao');
router.post('/addorder', function(req, res, next) {
    orderDao.add(req, res, next);
});
module.exports = router;