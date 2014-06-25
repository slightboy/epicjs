var lambda = require('../System.Linq/lambda.js'),
Enumerable = require('../System.Linq/Enumerable.js');

(function(window)
{

  Array.prototype.first = function(predicate /*, thisArg */)
  {
    if (this.length === 0) return undefined;
    return arguments.length == 0 ? this[0] : Array.prototype.find.apply(this, arguments);
  };

  Array.prototype.last = function()
  {
    if (this.length === 0) return undefined;
    return arguments.length == 0 ? this[this.length - 1] : Array.prototype.findLast.apply(this, arguments);
  };
  Array.prototype.any = function(predicate /*, thisArg */)
  {
    arguments[0] = lambda(predicate);
    return Array.prototype.some.apply(this, arguments);
  };
  Array.prototype.all = function(predicate /*, thisArg */)
  {
    arguments[0] = lambda(predicate);
    return Array.prototype.every.apply(this, arguments);
  };
  Array.prototype.contains = function(value, predicate)
  {
    if (predicate == null)
      predicate = '(x, y) => x === y';
    return Array.prototype.any.apply(this, arguments);
    
  };
  Array.prototype.distinct = function()
  {
    return Array.prototype.filter(function(e, i, me)
    {
      return me.indexOf(e) === i;
      //return me.lastIndexOf(e) === i;
      //return me.indexOf(e, i+1) === -1;
    });
  };
  Array.prototype.removeValue = function(value)
  {
    if (Array.isArray(value))
      Array.prototype.removeValue.apply(this, value)
    var index;
    for(var i = 0; i < arguments.length; i++)
    {
      index = this.indexOf(arguments[i]);
      if (index > -1)
        delete this[index];
    }
  };
  Array.prototype.select = function(predicate /*, thisArg */)
  {
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    predicate = lambda(predicate);
    var result = [];
    this.forEach(function(e)
    {
      result.push(predicate(e));
    }, thisArg);
    return result;
  }
  Array.prototype.where = function(predicate /*, thisArg */)
  {
    arguments[0] = lambda.apply(this, arguments);
    return Array.prototype.filter.apply(this, arguments);
  };
  Array.prototype.each = function(predicate /*, thisArg */)
  {
    arguments[0] = lambda(predicate);
    return Array.prototype.forEach.apply(this, arguments);
  };
  // 生成两个序列的交集
  Array.prototype.intersect = function(value, comparer)
  {
    comparer = lambda(comparer || '(x, y) => x === y');

    var result = [];
    this.each(function(x)
    {
      if (value.any(function(y) { return comparer.call(this, x, y); }))
        result.push(x);
    }, this);
    return result;
  };

  // 生成两个序列的差集
  Array.prototype.except = function(value, comparer)
  {
    comparer = lambda(comparer || '(x, y) => x === y');

    var result = [];
    this.each(function(x)
    {
      if (!value.any(function(y) { return comparer(x, y); }))
        result.push(x);
    });
    return result;
  };




  Array.prototype.min = function(comparer /*, thisArg */)
  {
    return Enumerable.MinMaxIterator.call(null, this, comparer || '(x, y) => x < y', arguments[1]);
  };
  Array.prototype.max = function(comparer /*, thisArg */)
  {
    return Enumerable.MinMaxIterator.call(null, this, comparer || '(x, y) => x > y', arguments[1]);
  };


  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(predicate) {
        if (this == null) throw new TypeError('Array.prototype.find called on null or undefined');

        predicate = lambda(predicate);
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          if (i in list) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
        }
        return undefined;
      }
    });
  };


  if (!Array.prototype.findLast) {
    Object.defineProperty(Array.prototype, 'findLast', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(predicate) {
        if (this == null) throw new TypeError('Array.prototype.find called on null or undefined');

        predicate = lambda(predicate);
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = length - 1; i > -1; i--) {
          if (i in list) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
        }
        return undefined;
      }
    });
  };

})(global || window);
