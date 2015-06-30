var express = require('express');
var router = express.Router();
var  fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/Roms",function(req,res,next){

  //list directory of /recalbox/share/roms
  getAllFolder('/recalbox/share/roms', function(filePath, stat) {
    console.log(filePath);
  });


  res.render('roms',{pageTitle:'Roms'});
});

router.get("/Bios",function(req,res,next){
  //list file of /recalbox/share/bios
  getAllFiles("/recalbox/share/bios",function(filePath, stat) {
    console.log(filePath);
  });

  res.render('bios',{pageTitle:'Bios'});
});

router.get("/Config",function(req,res,next){
  // show config file  /recalbox/share/system/recalbox.conf
  var config;
  fs.readFile('/recalbox/share/system/recalbox.conf', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
   // console.log(data);
   // config = data;
    res.render('config',{pageTitle:'Config',conf:data});
  });

//  console.log(config);
 // res.render('config',{pageTitle:'Config',conf:config});
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
      walk(filePath, callback);
    }
  });
}

module.exports = router;
