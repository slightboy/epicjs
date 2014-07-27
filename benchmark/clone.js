var lambda = require('../lib/System.Linq/lambda.js');

var Benchmark = require('benchmark');


(function(suite)
{


var Enumerable =
{
  any: function(fn, callback)
  {
    if (!fn) return Enumerable.count.call(this) != 0;
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

function clone1(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function clone2(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    Object.keys(obj).forEach(function(key) {
    copy[key] = obj[key];
  });
    return copy;
}


function clone3(obj)
{
  if (Array.isArray(obj)) return obj.slice();

  var source, prop;
  for (var i = 1, length = arguments.length; i < length; i++)
  {
    source = arguments[i];
    for (prop in source)
      if (source.hasOwnProperty(prop)) obj[prop] = source[prop];
  }
  return obj;
};

    clone3({}, Enumerable);

  suite.add('basic#clone1', function()
  {
    clone1(Enumerable);
  })
  suite.add('basic#clone2', function()
  {
    clone2(Enumerable);
  })
  suite.add('basic#clone3', function()
  {
    clone3({}, Enumerable);
  })
  suite.add('basic#json', function()
  {
    JSON.parse( JSON.stringify( Enumerable ) );
  })
  .on('cycle', function(event)
  {
    console.log(String(event.target));
  })
  .on('complete', function()
  {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })

  .run({ 'async': true });
})(new Benchmark.Suite);

