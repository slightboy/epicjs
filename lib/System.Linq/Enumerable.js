var lambda = require('./lambda.js');
require('../System/Array.js');

(function(window)
{
  var Enumerable = {};

  Enumerable.MinMaxIterator = function(source, comparer /*, thisArg */)
  {
    if (source.length === 0) return undefined;
    var current = source.first();
    if (source.length === 1) return current;
    comparer = lambda(comparer);
    var thisArg = arguments[2];


    source.each(function(item)
    {
      if (comparer.call(thisArg, item, current))
        current = item;
    });
    return current;
  };




  Enumerable.IntersectExceptIterator = function(source, comparer /*, thisArg */)
  {
    comparer = lambda(comparer);
    var thisArg = arguments[2];

    var result = [];

    source.each(function(e)
    {
      if (comparer(e))
        result.push(e);
    });
    return result;
  };

  if(module && module.exports) {
    module.exports = Enumerable;
  }

})(global || window);