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


var recalboxBiosPath = "/recalbox/share/bios";


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

router.route('/upload').post(function(req, res, next) {
    var section = req.params.section;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        var pathNewFile = recalboxBiosPath  + "/" + filename;
        var fstream = fs.createWriteStream(pathNewFile);

        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
        });
    });
    req.busboy.on('finish', function() {
        res.redirect('back');           //where to go next
    });
});

router.get("/delete/:file",function(req,res,next){

    var section = req.params.section;
    var file = req.params.file;
    var filePath =recalboxBiosPath +"/"+file;
    fs.unlinkSync(filePath);
    res.redirect("/Bios");
});


// todo : remove, it's just a sample
function checksum (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

module.exports = router;