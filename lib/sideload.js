var _ = require('lodash');
var dig = require('dig-it');

// very sophisticated: basically add an s on the end of a string if there
// isn't one already
function pluralize (str) {
  return !!str.match(/s$/i) ? str : str + 's';
}

function sideload (data, path, primaryKey) {
  data = _.cloneDeep(data);
  primaryKey = primaryKey || 'id';
  var docs = dig(data).get(path);
  var topKey = pluralize(_.last(path.split('.')));

  data[topKey] = _.isArray(docs) ? docs : [docs];

  dig(data).set(path, function (doc) {
    return dig(doc).get(primaryKey);
  });

  return data;
}

module.exports = sideload;
