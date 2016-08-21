const db = require('../sheepDB');
const mongoose = require('mongoose');
const Devs = require('../models/devModel');

function setCookie(req, res, next) {
  // const sheepCookie = {
  //   _id: req.body.dev._id,
  //   userName: req.body.dev.userName,
  //   database: req.body.dev.database.length > 0
  // };
  // res.cookie('sheep', sheepCookie, { maxAge: 60000, httpOnly: true }).send(true);

  // httpOnly not set to true, for MVP purposes!
  res.cookie('_id', req.body.dev._id, { maxAge: 600000 });
  res.cookie('username', req.body.dev.userName, { maxAge: 600000 });
  res.cookie('database', req.body.dev.database.length > 0, { maxAge: 600000 }).send(true);
}

function setDatabaseCookieTrue(req, res, next) {
  res.cookie('database', true, { maxAge: 600000 }).json(req.body.result);
}

export default { setCookie, setDatabaseCookieTrue };
