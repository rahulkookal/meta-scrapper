var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid');
var app = require('../app.js');

module.exports = {
    app: app,
    uuid: uuid,
    expect: chai.expect,
    request: supertest(app)
  } 