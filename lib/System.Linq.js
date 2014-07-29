
var lambda = require('epiclambda');
var Enumerable = require('./System.Linq/Enumerable');



Object.prototype.asQueryable = Object.prototype.linq = function()
{
  return epicjs(this);
}



function extend(value)
{
    var result = Object.create(value);//value.constructor();

    Enumerable.each.call(Enumerable, function(e, i, k)
    {
      result[k] = function()
      {
        if (Enumerable.any.call(['any', 'first', 'last', 'insert', 'where', 'count', 'select', 'selectmany'], function(v) { return v == k;}))
          return (function(v){ return epicjs(v); })(e.apply(this, arguments));
        return this;
      };
    });

    return result;
}

var cached = {};
function cache(value)
{
  if (value.constructor != Object && value.constructor != Array) return this;
  var key = value.constructor;
  if (key in cached)
    return cached[key];

  var result = extend(value);
  result.__proto__ = value;

  return cached[key] = result;
}


var epicjs = function(value)
{
  if (!value) return value;
  value.__proto__ = cache(value.__proto__);
  return value;
}


if(module && module.exports)
  module.exports = epicjs;