var util = require('util');
var lambda = require('./System.Linq/lambda.js');

var Enumerable =
{
  any: function(fn, callback)
  {
    if (fn == null) return;
    fn = lambda(fn);

    var result = false;
    function predicate(e, i , k, t)
    {
      if (fn(e, i, k, t) === true)
      {
        result = true;
        return false;
      }
    }

    Enumerable.each.call(this, predicate);
    return result;
  },

  first: function(fn)
  {
    var result;
    fn = lambda(fn);

    function predicate(e, i , k, t)
    {
      if ((fn == null && i == 0) || (fn && fn(e, i, k, t) === true))
      {
        result = e;
        return false;
      }
    };

    Enumerable.each.call(this, predicate);
    return result;
  },

  last: function(fn)
  {
    var result;
    fn = lambda(fn);

    function predicate(e, i, k, t)
    {
      if ((fn == null && (i+1) == len) || (fn && fn(e, i, k, t) === true))
      {
        result = e;
        return false;
      }
    };

    Enumerable.each.call(this, predicate);
    return result;
  },

  select: function(fn)
  {
    if (fn == null) return;
    fn = lambda(fn);

    var result = [];
    function predicate(e, i , k, t)
    {
        result.push(fn(e, i, k, t));
    }

    Enumerable.each.call(this, predicate);
    return result;
  },

  selectmany: function(fn)
  {
    if (fn == null) return;
    fn = lambda(fn);

    var result = [];
    function predicate(e, i , k, t)
    {
         Array.prototype.push.apply(result, fn(e, i, k, t));     
    }

    Enumerable.each.call(this, predicate);
    return result;  
  },

  where: function(fn)
  {
    if (fn == null) return;
    fn = lambda(fn);

    var result = [];
    function predicate(e, i , k, t)
    {
      if (fn(e, i, k, t) === true)
        result.push(e);
    }

    Enumerable.each.call(this, predicate);
    return result; 
  },


  // 正向
  each: function(fn)
  {

    if (this == null)
      throw new TypeError(" this is value or not defined");
    if (fn == null) return;

    var o = Object(this);
    var key, keys = Object.keys(o);
    var i = 0, len = keys.length;

    while(i < len)
    {
      key = keys[i];
      // value index key count
      if (fn.call(null, o[key], i, key, len) === false) break;
      i++;
    }
  },
  // 反向
  eachR: function(fn)
  {

    if (this == null)
      throw new TypeError(" this is value or not defined");
    if (fn == null) return;

    var o = Object(this);
    var key, keys = Object.keys(o);
    var len = keys.length, i = len - 1;

    while(i >= 0)
    {
      key = keys[i];
      // value index key count
      if (fn.call(null, o[key], i, key, len) === false) break;
      i--;
    }
  },

  count: function(fn)
  {
    if (!fn)
      return this.length ? this.length : Object.keys(this).length;

    var result = 0;
    Enumerable.each.call(this, function(e, i, k, t)
    {
      if (fn.call(this, e, i, k, t))
        result++;
    });

    return result;
  },

  insert: function(index)
  {

    if (arguments.length == 2 && util.isArray(arguments[1]))
      Enumerable.insert.apply(this, Array.prototype.slice.call(arguments, 1));

    if (this.length)
    {
      var args = [index, 0];
      Array.prototype.push.apply(args, Array.prototype.slice.call(arguments, 1))
      return Array.prototype.splice.apply(this, args);
    }
    
    var args = Array.prototype.slice.call(arguments, 1);
    this[index] = args.length === 1 ? args[0] : args;
  }


};



var epicjs = function(value)
{
  return new epicjs.fn.init(value);
}


epicjs.fn = epicjs.prototype =
{
  constructor: epicjs,
  init: function(value)
  {
    this.value = value;

    return this;
  }
};

epicjs.fn.init.prototype = epicjs.fn;


(function(context)
{
  Enumerable.each.call(Enumerable, function(e, i, k)
  {
    context[k] = function(value, fn) { return e.call(value, fn) };
  });
})(epicjs);


(function(context)
{
  Enumerable.each.call(Enumerable, function(e, i, k)
  {
    context[k] = function()
    {

      if (Enumerable.any.call(['any', 'first', 'last', 'each', 'eachR', 'insert'], function(v) { return v == k;}))
        return e.apply(this.value, arguments);

      this.value = e.apply(this.value, arguments) || this.value;
      return this;
    };
  });
})(epicjs.prototype);

epicjs.prototype["test"] = 1;

var x = epicjs({a:1});


//console.log(x.select('e => e.a').where('e => e == 2').any('e => e == 2'));

console.log(x);
x.insert('a', 'test', 2);
console.log(x);
