var lambda = require('./System.Linq/lambda.js');
var Enumerable = require('./Enumerable');




function clone(value)
{
    if (null == value || "object" != typeof value) return value;
    var result = value.constructor();
    for (var key in value)
        if (value.hasOwnProperty(key)) result[key] = value[key];
    return result;
}

var cached = {};
function cache(value)
{
  if (value in cached) return cached[value];

  var result = clone(Enumerable);
  result.__proto__ = value;

  return cached[value] = result;
}


var epicjs = function(value)
{
  value.__proto__ = cache(value.__proto__);
  return value;
}

  if(module && module.exports)
    module.exports = epicjs;