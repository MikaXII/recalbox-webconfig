var express = require('express');
var router = express.Router();
var  fs = require('fs');
var path = require('path');

// Const
var recalboxConfPath    = '/recalbox/share/system/recalbox.conf';
var recalboxRomsPath     = '/recalbox/share/roms';
var recalboxBiosPath    = "/recalbox/share/bios";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ROMS */
router.get("/Roms/:dir",function(req,res,next){

  //list directory of /recalbox/share/roms
    var arrayDIr =  fs.readdirSync(recalboxRomsPath);
    var selectedDir = req.params.dir;
    if(selectedDir == "home") {
        res.render('roms', {pageTitle: 'Roms', directory: arrayDIr});
    }else {

        //https://www.npmjs.com/package/drag-and-drop-files

        var arrayFile = fs.readdirSync(recalboxRomsPath + "/" + selectedDir);
        res.render('roms', {pageTitle: 'Roms', directory: arrayDIr, files: arrayFile});
    }

});

router.get("/Bios",function(req,res,next){
  //list file of /recalbox/share/bios
  getAllFiles(recalboxBiosPath,function(filePath, stat) {
      console.log(filePath);
  });

  res.render('bios',{pageTitle:'Bios'});
});

router.get("/Config",function(req,res,next){
  // show config file  /recalbox/share/system/recalbox.conf
  var config;
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


router.get("/Log",function(req,res,next){
  // dmesg
  //recalbox.log
  // etc...
  res.render('log',{pageTitle:'Log'});
});

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
