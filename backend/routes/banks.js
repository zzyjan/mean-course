const express = require("express");
const router = express.Router();
const fs = require('fs');
const xmlParser = require('xml2json');
var iconv = require('iconv-lite');
const multer = require('multer');

const Bank = require('../models/bank');
const IcbcBranch = require('../models/icbcBranch');

const DIR = 'backend/assets';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});


const path = require('path');

// reading file and load file data into IcbcBank table
router.post('/addIcbcBranches', upload.single('AreaCodes'), (req, res, next) =>{
  if(!req.file){
    console.log("No file received");
    return res.send({
      success: false
    });
  }
  else {
    fs.readFile( req.file.path, {encoding: 'binary'}, function(err, data) {
      if(err)          
        console.log("读取文件fail " + err);  
      else{        
        var buf = new Buffer(data, 'binary');
        var xmlStr = iconv.decode(buf, 'GBK');
        var jsonObj = xmlParser.toJson(xmlStr, {object: true});
        var branch = jsonObj.AreaCodeConf;
        // branch.state   state.city
        var branchList = [];
        var stateList = branch.state;
        for (var i = 0; i < stateList.length; i++){
          if(stateList[i].Name == '北京'){
            console.log(stateList[i]);
          }
          if(stateList[i].Name){
            var cityList = stateList[i].City;
            if(cityList.length == undefined){
              var city = stateList[i].City;
              branchList.push({stateName: stateList[i].Name, cityName: city.Name, areaCode: city.AreaCode});
            }
            for (var j = 0; j < cityList.length; j++){
              var city = cityList[j];
              branchList.push({stateName: stateList[i].Name, cityName: city.Name, areaCode: city.AreaCode});
            }
          }

        }
        IcbcBranch.deleteMany({}, (err) => {
          if(!err){
            IcbcBranch.insertMany(branchList, (err, branch) =>{
              if (err) {
                console.log(err);
              };
              console.log(branch);
            })
          }
        });
      }
    })
    return res.send({
      success: true
    })
  }
})

// reading file and load file data into Bank table
router.post('/addBanks', upload.single('InterBankCodeInfo'), (req, res, next) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log(req.file);
    console.log('file received');
    fs.readFile( req.file.path, {encoding: 'binary'}, function(err, data) {
      if(err)          
        console.log("读取文件fail " + err);  
      else{        
        var buf = new Buffer(data, 'binary');
        var xmlStr = iconv.decode(buf, 'GBK');
        var jsonObj = xmlParser.toJson(xmlStr, {object: true});
        var banks = jsonObj.InterBankCodeConf.ibps;
        var bankList = [];
        for( i = 0; i < banks.length; i++){
          var bankInfo = banks[i].ibpsName;
          if(bankInfo.name){
            bankList.push({
              name: bankInfo.name,
              paySysBankCode: 'IBPS' + bankInfo.paySysBankCode,
              description: bankInfo.name
            });
          }
          else if (Array.isArray(bankInfo)){
            for( j = 0; j < bankInfo.length; j++){
              var nextBankInfo = bankInfo[j];
              if(nextBankInfo.name){
                bankList.push({
                  name: nextBankInfo.name,
                  paySysBankCode: 'IBPS' + nextBankInfo.paySysBankCode,
                  description: nextBankInfo.name
                });
              }
            }
          }
        }
        Bank.deleteMany({}, (err) => {
          if(!err){
            Bank.insertMany(bankList, (err, bank) =>{
              if (err) {
                console.log(err);
              };
              console.log(bank);
            })
          }
        });
      }
    })
    return res.send({
      success: true
    })
  }
});


router.get('/getBanks', (req, res, next) => {
  Bank.find()
    .then(documents => {
      res.status(200).json({
        message: 'Banks fetched succesfully',
        bankList: documents
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
});


router.get('/getIcbcBranches', (req, res, next) => {
  IcbcBranch.find()
    .then(documents => {
      res.status(200).json({
        message: 'Icbc Branches fetched succesfully',
        branchList: documents
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Icbc Branches failed!"
      });
    });
})
module.exports = router;

