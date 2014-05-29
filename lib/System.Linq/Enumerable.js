var lambda = require('./lambda.js');
require('../System/Array.js');

(function(window)
{
  var
    $type = EnumerableClass,
    $prototype = $type.prototype;

  $type.__typeName = 'Enumerable';
  $type.__class = true;

  function EnumerableClass()
  {

  };

  var Enumerable = new EnumerableClass();

  $prototype.MinMaxIterator = function(source, comparer /*, thisArg */)
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

  $prototype.IntersectExceptIterator = function(source, comparer /*, thisArg */)
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



  $prototype.Aggregate = function()
  {

  };

  $prototype.All = function()
  {

  };

  $prototype.Any = function()
  {

  };

  $prototype.AsEnumerable = function()
  {

  };

  $prototype.Average = function()
  {

  };

  $prototype.Concat = function()
  {

  };

  $prototype.Contains = function()
  {

  };

  $prototype.Count = function()
  {

  };

  $prototype.Distinct = function()
  {

  };

  $prototype.ElementAt = function()
  {

  };

  $prototype.Except = function()
  {

  };

  $prototype.First = function()
  {

  };

  $prototype.GroupBy = function()
  {

  };

  $prototype.GroupJoin = function()
  {

  };

  $prototype.Intersect = function()
  {

  };

  $prototype.Join = function()
  {

  };

  $prototype.Last = function()
  {

  };

  $prototype.Max = function()
  {

  };

  $prototype.Min = function()
  {

  };

  $prototype.OrderBy = function()
  {

  };

  $prototype.OrderByDescending = function()
  {

  };

  $prototype.Range = function()
  {

  };

  $prototype.Reverse = function()
  {

  };

  $prototype.Select = function()
  {

  };

  $prototype.SelectMany = function()
  {

  };

  $prototype.SequenceEqual = function()
  {

  };

  $prototype.Single = function()
  {

  };

  $prototype.Skip = function()
  {

  };

  $prototype.SkipWhile = function()
  {

  };

  $prototype.Sum = function()
  {

  };

  $prototype.Take = function()
  {

  };

  $prototype.TakeWhile = function()
  {

  };

  $prototype.ThenBy = function()
  {

  };

  $prototype.ThenByDescending = function()
  {

  };

  $prototype.ToArray = function()
  {

  };

  $prototype.ToDictionary = function()
  {

  };

  $prototype.Union = function()
  {

  };

  $prototype.Where = function()
  {

  };

  $prototype.Zip = function()
  {

  };





  if(module && module.exports)
    module.exports = Enumerable;




})(global || window);