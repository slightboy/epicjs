var lambda = require('epiclambda');

var Benchmark = require('benchmark');




(function(suite)
{

  var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var o = {a:1, b:2,c:3};

  function each1(iterator)
  {
    var keys = Object.keys(this), count = keys.length;
    for (var i = 0, key; i < count; i++)
    {
      key = keys[i];
      //  value, index, key, data, count
      if (iterator.call(null, this[key], i, key, this, count) === false) break;
    };
  }

  function each2(iterator)
  {
    var keys = Object.keys(this), count = keys.length, i = 0, key;

    while(i <count)
    {
      key = keys[i];
      //  value, index, key, data, count
      if (iterator.call(null, this[key], i, key, this, count) === false) break;
      i++;
    }

  }


  suite.add('basic#each1', function()
  {
    each1.call(a, function(e) { return e > 5; });
  })
  suite.add('basic#each2', function()
  {
    each2.call(a, function(e) { return e > 5; });
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

