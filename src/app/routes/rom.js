/**
 * Created by mika on 03/08/15.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var busboy = require('connect-busboy');

router.use(busboy());


// Const
var recalboxRomsPath     = '/recalbox/share/roms';

/* GET ROMS */
router.get("/:dir",function(req, res, next) {

    //list directory of /recalbox/share/roms
    var arrayDIr =  fs.readdirSync(recalboxRomsPath);
    var selectedDir = req.params.dir;

    if(selectedDir == "home") {
        res.render('rom_index', {
            page_title: 'Roms',
            directory: arrayDIr
        });
    } else {
        //https://www.npmjs.com/package/drag-and-drop-files
        //https://www.npmjs.com/package/dropzone
        var filePath = path.join(recalboxRomsPath, selectedDir);

        var files = [];
        var arrayFile = fs.readdirSync(filePath);

        arrayFile.forEach(function (item) {
            var stat = fs.statSync(filePath + '/' + item);
            //console.log('file stat', stat);

            var fsize = parseFloat(stat.size /1000000.0).toFixed(2);

            files.push({
                section: selectedDir,
                name: item,
                fsize: fsize
            });
        });

        res.render('rom_list', {
            page_title: 'Roms for '+selectedDir,
            directory: arrayDIr,
            files: files,
            sltPath: selectedDir
        });
    }

});

router.route('/upload/:section').post(function(req, res, next) {
    var section = req.params.section;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        var pathNewFile = recalboxRomsPath + "/" + section + "/" + filename;
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

router.get("/delete/:section/:file",function(req,res,next){

    var section = req.params.section;
    var file = req.params.file;
    var filePath =recalboxRomsPath+"/"+section+"/"+file;
    fs.unlinkSync(filePath);
    res.redirect("/Roms/"+section);
});

module.exports = router;