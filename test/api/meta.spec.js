const assert = require('assert');
var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid');
var app = require('../../app.js');

var request = supertest(app)

describe('POST /meta', function() {
    it('API success', function(done) {
        request.post('/meta')
            .send({url: "https://developer.mozilla.org"})
            .expect(200)
            .end(function(err, res) {
                done(err);
            });
    });

    it('URL missing', function(done) {
        request.post('/meta')
            .send()
            .expect(500)
            .end(function(err, res) {
                done(err);
            });
    });
});