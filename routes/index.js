var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/Roms",function(req,res,next){

  //list directory of /recalbox/share/roms
  res.render('roms',{pageTitle:'Roms'});
});

router.get("/Bios",function(req,res,next){
  //list file of /recalbox/share/bios
  res.render('bios',{pageTitle:'Bios'});
});

router.get("/Config",function(req,res,next){
  // show config file  /recalbox/share/system/recalbox.conf
  res.render('config',{pageTitle:'Config'});
});

router.get("/Log",function(req,res,next){
  // dmesg
  //recalbox.log
  // etc...
  res.render('log',{pageTitle:'Log'});
});
module.exports = router;
