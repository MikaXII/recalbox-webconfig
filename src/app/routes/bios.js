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


var recalboxBiosPath    = "/recalbox/share/bios";


// todo bug : to many duplicate entry
router.get("/",function(req,res,next){
    //list file of /recalbox/share/bios

    var arrayFile =  fs.readdirSync(recalboxBiosPath);
    var files =[];
    var hash;

    arrayFile.forEach(function(item){
        if(item != "readme.txt" && item !="lisez-moi.txt") {

            var stream = fs.ReadStream(recalboxBiosPath + "/" + item);
            stream.on("data", function (d) {
                hash = checksum(d);
                files.push({name: item, hash:hash});
            });

        }
    });

    res.render('bios',{pageTitle:'Bios',files:files});
});


// todo : remove, it's just a sample
function checksum (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

module.exports = router;