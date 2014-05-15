var CSV = require('csv-string');
var multibuffer = require('multibuffer');

/**
 * @param {Readable} readable
 * @param {Object} opts
 * @param {string} [opts.filename] The name of the file, if applicable
 * @param {function(?Error, string)} cb
 * @return {string} (json|ldjson|csv)
 */
module.exports = function (readable, opts, cb) {
  readable.on('data', litmus.bind(this, (opts || {}), cb));
};

function litmus(opts, cb, data) {
  var ext;
  var format;
  var text;

  if (opts.filename) {
    var fileExtension = getExtension(opts.filename);
    if (fileExtension) ext = fileExtension;
  }

  text = getTestText(data);
  format = getTextFormat(text);

  if (!format) {
    format = getFormat(data);
  }

  if ((ext && format) && ext !== format) {
    cb(new Error('File extension: '+ ext + ' does not match detected format: ' + format));
  }
  return cb(null, (format || ext));
}

function getTestText(data) {
  return data.toString('utf8');
}

function getExtension(filename) {
  var extension = filename.match(/\.(.+$)/);
  if (extension && extension.length > 1) {
    return extension[1];
  }
  return null;
}

function getFormat(data) {
  try {
    multibuffer.unpack(data);
    return 'multibuffer';
  } catch(e) {
    noop();
  }
}

function getTextFormat(string) {
  try {
    JSON.parse(string);
    return 'json';
  } catch(e) {
    noop(); 
  }

  if (isldJSON(string)) {
    return 'ldjson';
  }

  if (CSV.parse(string).length > 1) {
    return 'csv';
  }

  return null;
}

function isldJSON(string) {
  var split = string.split('\n');
  if (split.length === 1) {
    return false;
  }
  try {
    JSON.parse(split[0]);
    return true;
  } catch(e) {
    return false;
  }
}

function noop() {}
