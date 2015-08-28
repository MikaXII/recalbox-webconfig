/**
* Created by mika on 03/08/15.
*/
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var busboy = require('connect-busboy');
var exec = require('child_process').exec;
router.use(busboy());

var recalboxBiosPath = "/recalbox/share/bios";

router.get("/",function(req,res,next){

    var arrayFile = fs.readdirSync(recalboxBiosPath);
    var files =[];
    var fHash = [];

    exec("cd " + recalboxBiosPath +" && md5sum -c readme.txt", function (error, stdout, stderr){
        var tab = stdout.split('\n');
        for(var i =0;i<tab.length;++i){
            var ssTab = tab[i].split(':');
            if(ssTab.length >= 2) {
                fHash.push({
                    name: ssTab[0],
                    exist: (ssTab[1]==' OK' || ssTab[1]==' Réussi'),
                    hash: ssTab[1]
                });
            }
        }

        arrayFile.forEach(function (item) {
            if(item != "readme.txt" && item != "lisez-moi.txt") {
                files.push({
                    name: item
                });
            }
        });

        res.render('bios',{
            page_title: 'Bios',
            fHashs: fHash,
            files:files
        });
    });
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


module.exports = router;
