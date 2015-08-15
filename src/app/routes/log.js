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






var recalboxLog    = "/recalbox.log";


router.get("/",function(req,res,next){
    // dmesg
    //recalbox.log
    // etc...

    fs.readFile(recalboxLog, 'utf8', function (err,data) {
        if (err) {
            //res.render('log',{pageTitle:'Log',log:err});
            //   return console.log(err);
        }
        console.log(data);
        res.render("log",{
            page_title: "Log",
            conf: data
        });

    });

});

module.exports = router;