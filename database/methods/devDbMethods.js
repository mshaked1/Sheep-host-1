const Devs = require('../models/devModel');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/';


// when user clicks createDB button, rest of his profile populates
function updateDevProfile(req, res, next){
  const query = { userName: req.body.userName };
  const data = {
    database: [{
      id: req.body.dbId,
      name: req.body.dbName,
      collections: [{
        name: req.body.collectionName,
        devSchema: req.body.schema
      }],
    }],
  };

  Devs.findOneAndUpdate(query, { $set: data }, function(err, dev) {
    if (err) throw err;
    console.log(dev);
    next();
  });
}

// new DB spooled up using id from dev profile and chosen db name
function createDevDB(req, res, next) {
  console.log('inside createDevDB');
  const devDB = mongoose.createConnection(uri + req.body.dbId + '_' + req.body.dbName);
  const devModel = devDB.model('label', new mongoose.Schema({
    createdBy: String
  }));

  devModel({
    createdBy: req.body.userName
  }).save(function (err, results) {
    console.log('model saved', results);
    if (err) throw err;
    res.json(results);
  });
}

module.exports = { updateDevProfile, createDevDB };
