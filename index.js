var CSV = require('csv-string');

module.exports = litmus

function litmus(data, opts, cb) {
  var ext;
  var format;
  var text;

  if (opts.filename) {
    var fileExtension = getExtension(opts.filename);
    if (fileExtension) ext = fileExtension;
  }

  text = getTestText(data);
  format = getTextFormat(text);

  if ((ext && format) && ext !== format) {
    return new Error('File extension: '+ ext + ' does not match detected format: ' + format)
  }
  
  return format || ext
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
  var split = string.split(/\r?\n/);
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
