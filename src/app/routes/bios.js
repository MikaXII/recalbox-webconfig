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
//var hashMD5 = crypto.createHash('md5');

// todo bug : to many duplicate entry
router.get("/",function(req,res,next){
    //list file of /recalbox/share/bios

    var arrayFile = fs.readdirSync(recalboxBiosPath);

    var files =[];

    /*arrayFile.forEach(function(item){
        if(item != "readme.txt" && item !="lisez-moi.txt") {
            fs.readFile(recalboxBiosPath + "/" + item, 'utf8', function(e, b) {  // Using string here to be fair for all md5 engines
                console.log(md5(b))
            })
        }
    });*/


    var hashMD5;

    arrayFile.forEach(function(item){
        if(item != "readme.txt" && item !="lisez-moi.txt") {

            var stat = fs.statSync(recalboxBiosPath + "/" + item);

            var stream = fs.createReadStream(recalboxBiosPath + "/" + item);
            stream
                .on("readable", function () {
                    var chunk;
                    while (null !== (chunk = stream.read())) {
                        hashMD5 = checksum(chunk);
                    }
                   // hashMD5 = checksum(chunk);
                    // files.push({name: item, hash:hash});
                })
                .on("end",function(){
                    files.push({name: item, hash:hashMD5});
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
        .digest(encoding || 'hex')
}

module.exports = router;