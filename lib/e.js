var lambda = require('epiclambda');
var Enumerable = require('./Enumerable');


var typePrototype = {};
typePrototype[Object] = function(dest, source)
{
  Enumerable.each.call(source, function(e, i, k)
  {
    dest[k] = function()
    {
      if (Enumerable.any.call(['any', 'first', 'last', 'insert', 'where'], function(v) { return v == k;}))
        return (function(v){ return epicjs(v); })(e.apply(this, arguments));
      return this;
    };
  });
};


typePrototype[Boolean] = function(dest, source)
{

}

typePrototype[String] = function(dest, source)
{
  
}

function clone(value)
{

    if (null == value || "object" != typeof value) return value;
    var result = value.constructor();
    typePrototype[value.constructor] || typePrototype[value.constructor](result, value);
    return result;
}

var cached = {};
function cache(value)
{
  if (value in cached)
    return cached[value];

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
