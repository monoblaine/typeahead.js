/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var tokenizers = (function() {
  'use strict';

  return {
    nonword: nonword,
    whitespace: whitespace,
    whitespace_slugged: whitespace_slugged,
    obj: {
      nonword: getObjTokenizer(nonword),
      whitespace: getObjTokenizer(whitespace),
      whitespace_slugged: getObjTokenizer(whitespace_slugged)
    }
  };

  function whitespace(str) {
    str = _.toStr(str);
    return str ? str.split(/\s+/) : [];
  }

  function whitespace_slugged(str) {
    str = _.toStr(str).toSlug(' ');
    return str ? str.split(/\s+/) : [];
  }

  function nonword(str) {
    str = _.toStr(str);
    return str ? str.split(/\W+/) : [];
  }

  function getObjTokenizer(tokenizer) {
    return function setKey(keys) {
      keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);

      return function tokenize(o) {
        var tokens = [];

        _.each(keys, function(k) {
          tokens = tokens.concat(tokenizer(_.toStr(o[k])));
        });

        return tokens;
      };
    };
  }
})();
