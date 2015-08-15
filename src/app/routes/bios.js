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

// todo bug : to many duplicate entry
router.get("/",function(req,res,next){
    //list file of /recalbox/share/bios
    // Disable caching for content files
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    var arrayFile = fs.readdirSync(recalboxBiosPath);

    var files =[];

    /*arrayFile.forEach(function(item){
        if(item != "readme.txt" && item !="lisez-moi.txt") {
            fs.readFile(recalboxBiosPath + "/" + item, 'utf8', function(e, b) {  // Using string here to be fair for all md5 engines
                console.log(md5(b))
            })
        }
    });*/


    /* var hashMD5;
    arrayFile.forEach(function(item){
        if(item != "readme.txt" && item !="lisez-moi.txt") {

            var stat = fs.statSync(recalboxBiosPath + "/" + item);

            var stream = fs.createReadStream(recalboxBiosPath + "/" + item);
            stream.on("data", function (chunk) {
                hashMD5 = checksum(chunk);
                console.log(hashMD5); //good hash here
                });
            stream.on("end",function(){
                //files.push({name: item, hash:hashMD5}); // bad hash here
                //console.log(hashMD5);
                });
        files.push({name: item, hash:hashMD5}); // no hash here
        }
    });*/
    
    exec("cd " + recalboxBiosPath +" && md5sum -c readme.txt", function (error, stdout, stderr){
        // todo implement 
        //console.log(stdout);
        var tab = stdout.split('\n');
        for(var i =0;i<tab.length;++i){
            var ssTab = tab[i].split(':');
            if(ssTab.length >= 2)
            files.push({name:ssTab[0],hash:ssTab[1]});
        }

        res.render('bios',{
            page_title: 'Bios',
            files: files
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


// todo : remove, it's just a sample
function checksum (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

module.exports = router;
