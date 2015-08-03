/**
 * Created by mika on 03/08/15.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var busboy = require('connect-busboy');

router.use(busboy());


var recalboxConfPath    = '/recalbox/share/system/recalbox.conf';

router.get("/",function(req,res,next){
    // show config file  /recalbox/share/system/recalbox.conf
    fs.readFile(recalboxConfPath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        res.render('config',{pageTitle:'Config',conf:data});
    });

});

router.post("/",function(req,res)
{
    var data = req.body.recalboxconf;

    fs.writeFile(recalboxConfPath, data, function (err) {
        if (err) return console.log(err);
    });
    res.render('config',{pageTitle:'Config',conf:data});
});

// todo implement beginners method for edit conf

module.exports = router;