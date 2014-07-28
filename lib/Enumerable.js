var lambda = require('epiclambda');


var Enumerable =
{
  parse: function(fn)
  {
    var context;

    if (arguments.length == 1)
    {
      if (fn.context)
        return { context: fn.context, fn: lambda(fn.fn) };
      else
        return { fn: lambda(fn) };
    }


    if ('string' != typeof(fn) && 'function' != typeof(fn) && !fn.exp)
      return { context: fn, fn: lambda.apply(null, Array.prototype.slice.call(arguments, 1)) };


    if (fn.context)
        return { context: fn.context, fn: lambda.apply(null, arguments) };
    else
        return { fn: lambda.apply(null, arguments) };
  },
  any: function(fn)
  {
    if (!fn || arguments.length == 0) return Enumerable.count.apply(this, arguments) != 0;
    var args = Enumerable.parse.apply(null, arguments);

    var result = false;
    function predicate(e, i, k, d, c)
    {
      if (args.fn.call(args.context, e, i, k, d, c) === true)
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
    if (!this || arguments.length == 0 || !fn) return;

    var args = Enumerable.parse.apply(null, arguments);

    var result;

    function predicate(e, i, k, d, c)
    {
      if ((args.fn == null && i == 0) || (args.fn && args.fn.call(args.context, e, i, k, d, c) === true))
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
    if (!this || arguments.length == 0 || !fn) return;

    var args = Enumerable.parse.apply(null, arguments);

    var result;

    function predicate(e, i, k, d, c)
    {
      if ((args.fn == null && (i+1) == c) || (args.fn && args.fn.call(args.context, e, i, k, d, c) === true))
      {
        result = e;
        return false;
      }
    };

    Enumerable.reverseEach.call(this, predicate);
    return result;
  },

  count: function(fn)
  {
    if (!fn || arguments.length == 0)
      return this.length ? this.length : Object.keys(this).length;

    var args = Enumerable.parse.apply(null, arguments);

    var result = 0;
    Enumerable.each.call(this, function(e, i, k, d, c)
    {
      if (args.fn.call(args.context, e, i, k, d, c))
        result++;
    });

    return result;
  },

  insert: function(index)
  {

    if (arguments.length == 2 && Array.isArray(arguments[1]))
      Enumerable.insert.apply(this, Array.prototype.slice.call(arguments, 1));

    if (this.length)
    {
      var args = [index, 0];
      Array.prototype.push.apply(args, Array.prototype.slice.call(arguments, 1))
      return Array.prototype.splice.apply(this, args);
    }
    
    var args = Array.prototype.slice.call(arguments, 1);
    this[index] = args.length === 1 ? args[0] : args;
  },

  select: function(fn)
  {
    if (!this || arguments.length == 0 || !fn) return this;

    var args = Enumerable.parse.apply(null, arguments);


    var result = [];
    function predicate(e, i, k, d, c)
    {
        result.push(args.fn.call(args.context, e, i, k, d, c));
    };

    Enumerable.each.call(this, predicate);
    return result;
  },

  selectmany: function(fn)
  {
    if (!this || arguments.length == 0 || !fn) return [];

    var args = Enumerable.parse.apply(null, arguments);

    var result = [];
    function predicate(e, i, k, d, c)
    {
         result.concat(args.fn.call(args.context, e, i, k, d, c));     
    }

    Enumerable.each.call(this, predicate);
    return result;  
  },

  where: function(fn)
  {
    if (!this || arguments.length == 0 || !fn) return [];

    var args = Enumerable.parse.apply(null, arguments);

    var result = [];
    function predicate(e, i, k, d, c)
    {
      if (args.fn.call(args.context, e, i, k, d, c) === true)
        result.push(e);
    };

    Enumerable.each.call(this, predicate);
    return result; 
  },

  each: function(fn)
  {
    if (!this || arguments.length == 0 || !fn) return;

    var args = Enumerable.parse.apply(null, arguments);


    if (this.length)
    {
      for (var i = 0, count = this.length; i < count; i++)
        //  value, index, key, data, count
        if (args.fn.call(args.context, this[i], i, i, this, count) === false) break;
    }
    else
    {
      var keys = Object.keys(this);
      for (var i = 0, key, count = keys.length; i < count; i++)
      {
        key = keys[i];
        //  value, index, key, data, count
        //  e, i, k, d, c
        if (args.fn.call(args.context, this[key], i, key, this, count) === false) break;
      };
    }
  },

  reverseEach: function(iterator)
  {
    if (!this || arguments.length == 0 || !iterator) return;

    var context;
    if (arguments.length > 1)
    {
      if ('string' != typeof(iterator) && 'function' != typeof(iterator) && !iterator.exp)
      {
        context = iterator;
        iterator = arguments[1];
      }

    }

    if (this.length)
    {
      for (var i = this.length, count = i; i > -1; i--)
        //  value, index, key, data, count
        if (iterator.call(context, this[i], i, i, this, count) === false) break;
    }
    else
    {
      var keys = Object.keys(this);
      for (var i = this.length, count = i, key; i > -1; i--)
      {
        key = keys[i];
        //  value, index, key, data, count
        if (iterator.call(context, this[key], i, key, this, count) === false) break;
      };
    }
  }
/*

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
  rEach: function(fn)
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
*/



};


  if(module && module.exports)
    module.exports = Enumerable;