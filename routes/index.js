var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var busboy = require('connect-busboy');

router.use(busboy());


// Const
var recalboxConfPath    = '/recalbox/share/system/recalbox.conf';
var recalboxRomsPath     = '/recalbox/share/roms';
var recalboxBiosPath    = "/recalbox/share/bios";
var recalboxLog    = "/recalbox.log";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET ROMS */
router.get("/Roms/:dir",function(req, res, next) {

    //list directory of /recalbox/share/roms
    var arrayDIr =  fs.readdirSync(recalboxRomsPath);
    var selectedDir = req.params.dir;

    if(selectedDir == "home") {
        res.render('roms', { pageTitle: 'Roms', directory: arrayDIr });
    } else {
        //https://www.npmjs.com/package/drag-and-drop-files
        //https://www.npmjs.com/package/dropzone
        var filePath = path.join(recalboxRomsPath, selectedDir);

        var files = [];
        var arrayFile = fs.readdirSync(filePath);

        arrayFile.forEach(function (item) {
            var stat = fs.statSync(filePath + '/' + item);
            console.log('file stat', stat);

            var fsize = parseFloat(stat.size /1000000.0).toFixed(2);

            files.push({
				section: selectedDir,
				name: item,
				fsize: fsize
			});
        });

        res.render('roms', {pageTitle: 'Roms', directory: arrayDIr, files:files,sltPath:selectedDir});
    }

});

router.route('/Roms/upload/:section').post(function(req, res, next) {
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

router.get("/Roms/delete/:section/:file",function(req,res,next){

    var section = req.params.section;
    var file = req.params.file;
    var filePath =recalboxRomsPath+"/"+section+"/"+file;
    fs.unlinkSync(filePath);
    res.redirect("/Roms/"+section);
});

router.get("/Bios",function(req,res,next){
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

router.get("/Config",function(req,res,next){
    // show config file  /recalbox/share/system/recalbox.conf
    fs.readFile(recalboxConfPath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        res.render('config',{pageTitle:'Config',conf:data});
    });

});

router.post("/Config",function(req,res)
{
    var data = req.body.recalboxconf;

    fs.writeFile(recalboxConfPath, data, function (err) {
        if (err) return console.log(err);
    });
    res.render('config',{pageTitle:'Config',conf:data});
});


router.get("/Log",function(req,res,next){
    // dmesg
    //recalbox.log
    // etc...

    fs.readFile(recalboxLog, 'utf8', function (err,data) {
        if (err) {
            //res.render('log',{pageTitle:'Log',log:err});
            //   return console.log(err);
        }
        console.log(data);
        res.render("log",{pageTitle:"Log",conf:data});
        //res.render('config',{pageTitle:'Config',conf:data});

    });

});

function checksum (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}


// to remove, only sample
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
