const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');

const app = require('../server/server');
const db = require('../server/config/mongoose');
// insert models here


// TO DO: edit tests once database and routing is set up

describe('GET /api/users', function() {
  it('should retrieve Google Trends on /api/googletrends GET', function(done) {
    chai.request(app)
      .get('/api/googletrends')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});

describe('API Tests', function() {
  describe ('GET /api/twitter', function() {
    it('should list ALL stored Tweets on /api/twitter GET', function(done) {
      chai.request(app)
        .get('/api/twitter')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });

  describe ('GET /api/sentiment', function() {
    it('should list ALL Sentiments on /api/sentiment GET', function(done) {
      chai.request(app)
        .get('/api/sentiment')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });


  describe ('GET /api/googletrends', function() {
    it('should list ALL googleTrends data on /api/googletrends GET', function(done) {
      chai.request(app)
        .get('/api/news')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });

  describe ('GET /api/news', function() {
    it('should list ALL news data on /api/news GET', function(done) {
      chai.request(app)
        .get('/api/news')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  });

});
