var assert = require('assert');
var inherits = require('util').inherits;
var multibuffer = require('multibuffer');
var Readable = require('stream').Readable;
var streamcast = require('./');

function StubReadable() {
  Readable.call(this);
}
inherits(StubReadable, Readable);

StubReadable.prototype._read = function () {
  return null;
};

var csvData = 'a,b,c\n1,1,1\n10,1,1\n100,1,1';
var JSONData = JSON.stringify({'foo': 'bar'});
var ldJSONData = JSON.stringify({'foo': 'bar'}) + '\n' + JSON.stringify({'foo': 'bar'});
var multibufferData = multibuffer.pack([new Buffer('BUFFMAN')]);
function getStream(data) {
  var stream = new StubReadable();
  stream.push(data.slice());
  return stream;
}


describe('streamcast', function () {
  describe('csv', function () {
    it('should identify csv data', function (done) {
      streamcast(getStream(csvData), {}, function(err, data) {
        assert(!err);
        assert(data === 'csv');
        done();
      });
    });

    it('should identify csv files', function (done) {
      streamcast(getStream(csvData), { filename: 'hi.csv' }, function(err, data) {
        assert(!err);
        assert(data === 'csv');
        done();
      });
    });
  });

  describe('json', function () {
    it('should identify json data', function (done) {
      streamcast(getStream(JSONData), {}, function(err, data) {
        assert(!err);
        assert(data === 'json');
        done();
      });
    });

    it('should identify json files', function (done) {
      streamcast(getStream(JSONData), { filename: 'hi.json' }, function(err, data) {
        assert(!err);
        assert(data === 'json');
        done();
      });
    });
  });

  describe('ldjson', function () {
    it('should identify ldjson data', function (done) {
      streamcast(getStream(ldJSONData), {}, function(err, data) {
        assert(!err);
        assert(data === 'ldjson');
        done();
      });
    });
  });

  describe('multibuffer', function() {
    it('should identify multibuffer data', function (done) {
      // filename?
      streamcast(getStream(multibufferData), {}, function(err, data) {
        assert(!err);
        assert(data === 'multibuffer');
        done();
      });
    });
  });
});
