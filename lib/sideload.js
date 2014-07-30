var _ = require('lodash');
var dig = require('dig-it');

// very sophisticated: basically add an s on the end of a string if there
// isn't one already
function pluralize (str) {
  return !!str.match(/s$/i) ? str : str + 's';
}

function sideload (resp, path, primaryKey) {
  primaryKey = primaryKey || 'id';
  var docs = dig(resp).get(path);
  var topKey = pluralize(_.last(path.split('.')));

  resp[topKey] = _.isArray(docs) ? docs : [docs];

  resp = dig(resp).set(path, function (doc) {
    return dig(doc).get(primaryKey);
  });
}

module.exports = sideload;
