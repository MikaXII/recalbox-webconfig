var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var busboy = require('connect-busboy');

router.use(busboy());





/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// todo : implement status of recalbox







// todo : remove, it's just a sample
function getAllFolder(currentDirPath, callback) {

    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);

        if (stat.isFile()) {
            //callback(filePath, stat);
        } else if (stat.isDirectory()) {
            //walk(filePath, callback);
            callback(filePath, stat)
        }
    });
}

function getAllFiles(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            //walk(filePath, callback);
        }
    });
}

module.exports = router;
