var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var busboy = require('connect-busboy');

router.use(busboy());


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('foundation', { title: 'Foundation sample' });
});
module.exports = router;
