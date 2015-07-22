var _arity = require('./_arity');
var _slice = require('./_slice');
var max = require('../max');
var pluck = require('../pluck');
var reduce = require('../reduce');

/**
 * Create a predicate wrapper which will call a pick function (all/any) for each predicate
 *
 * @private
 * @see R.all
 * @see R.any
 */
module.exports = function _predicateWrap(predPicker) {
  return function(preds) {
    var predIterator = function() {
      var args = arguments;
      return predPicker(function(predicate) {
        return predicate.apply(null, args);
      }, preds);
    };

    var longest = reduce(max, 0, pluck('length', preds));

    return arguments.length > 1 ?
      // Call function immediately if given arguments
      predIterator.apply(null, _slice(arguments, 1)) :
      // Return a function which will call the predicates with the provided arguments
      _arity(longest, predIterator);
  };
};
