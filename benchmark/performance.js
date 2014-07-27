var lambda = require('../lib/System.Linq/lambda.js');

var Benchmark = require('benchmark');




(function(suite)
{

  suite.add('basic#push', function()
  {
      var dest = [5,6,7,8,9]
    var result = [1, 2, 3, 4 ];
    result.push(0);
    result.push.apply(result, dest);
  })
  suite.add('basic#splice', function()
  {
  var dest = [5,6,7,8,9]
    dest.splice(0, 0, 0);

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


return;


(function(suite)
{

  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var o = {a:1, b:2,c:3};

var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };



  function each1(obj, iterator) 
  {
    if (obj == null) return obj;
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++)
        iterator(obj[i], i, obj);
    } else {
      var keys = Object.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iterator(obj[keys[i]], keys[i], obj);
      }
    }
  };

    function each2(obj, iterator) 
  {
    if (obj == null) return obj;
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++)
        iterator.call(null, obj[i], i, obj);
    } else {
      var keys = Object.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iterator.call(null, obj[keys[i]], keys[i], obj);
      }
    }
  };

   function each3(obj, iterator, context) 
  {
    if (obj == null) return obj;
    iterator = createCallback(iterator, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++)
        iterator.call(null, obj[i], i, obj);
    } else {
      var keys = Object.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iterator.call(null, obj[keys[i]], keys[i], obj);
      }
    }
  };

  function each4(obj, iterator)
  {
    if (obj == null)
      throw new TypeError(" this is value or not defined");
    if (iterator == null) return;

    var o = Object(obj);
    var key, keys = Object.keys(o);
    var i = 0, len = keys.length;

    while(i < len)
    {
      key = keys[i];
      if (iterator(o[key], i, key, len) === false) break;
      i++;
    }
  }
  

  suite.add('basic#each1', function()
  {
    each1(a, function(e) { return e > 5; });
  })
  suite.add('basic#each2', function()
  {
    each2(a, function(e) { return e > 5; });
  })
  suite.add('basic#each3', function()
  {
    each3(a, function(e) { return e > 5; });
  })
  suite.add('basic#each4', function()
  {
    each4(a, function(e) { return e > 5; });
  })

  suite.add('basic#each2 object', function()
  {
    each1(o, function(e) { return e.a > 5; });
  })
  suite.add('basic#each2 object', function()
  {
    each2(o, function(e) { return e.a > 5; });
  })
  suite.add('basic#each3 object', function()
  {
    each3(o, function(e) { return e.a > 5; });
  })
  suite.add('basic#each4 object', function()
  {
    each4(o, function(e) { return e.a > 5; });
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

