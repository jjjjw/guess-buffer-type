var assert = require('assert');
var streamcast = require('./');

var csvData = new Buffer('a,b,c\n1,1,1\n10,1,1\n100,1,1');
var JSONData = new Buffer(JSON.stringify({'foo': 'bar'}));
var ldJSONData = new Buffer(JSON.stringify({'foo': 'bar'}) + '\n' + JSON.stringify({'foo': 'bar'}));

describe('streamcast', function () {
  describe('csv', function () {
    it('should identify csv data', function (done) {
      var data = streamcast(csvData, {})
      assert(!(data instanceof Error));
      assert(data === 'csv');
      done();
    });

    it('should identify csv files', function (done) {
      var data = streamcast(csvData, { filename: 'hi.csv' })
      assert(!(data instanceof Error));
      assert(data === 'csv');
      done();
    });
  });

  describe('json', function () {
    it('should identify json data', function (done) {
      var data = streamcast(JSONData, {})
      assert(!(data instanceof Error));
      assert(data === 'json');
      done();
    });

    it('should identify json files', function (done) {
      var data = streamcast(JSONData, { filename: 'hi.json' })
      assert(!(data instanceof Error));
      assert(data === 'json');
      done();
    });
  });

  describe('ldjson', function () {
    it('should identify ldjson data', function (done) {
      var data = streamcast(ldJSONData, {})
      assert(!(data instanceof Error));
      assert(data === 'ldjson');
      done();
    });
  });
});
