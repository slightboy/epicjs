var lambda = require('../System.Linq/lambda.js');
require('./Array.js');

(function(window)
{
  var
  	$type = Object,
    $prototype = $type.prototype;

  $type.__typeName = 'object';
  //$type.__typeCode = TypeCode.String;
  $type.__class = true;


	$prototype.first = function(predicate /*, context */)
	{
		var length = this.length >>> 0;
		if (length > 0)
			return Array.prototype.last.appley(this, arguments);

		var result;
		this.each(function(e)
		{
			result = e;
		});
		return result;

	};
	
	$prototype.last = function(predicate /*, context */)
	{
		var length = this.length >>> 0;
		if (length > 0)
			return Array.prototype.last.appley(this, arguments);

		var result;
		this.each(function(e)
		{
			result = e;
		});
		return result;
	};

	$prototype.select = function(predicate /*, context */)
	{
		predicate = lambda(predicate);
		var result = [];
		this.each(function(e)
		{
			result.push(predicate(e));
		}, this);
		return result;
	};

	$prototype.selectmany = function(predicate /*, context */)
	{
		predicate = lambda(predicate);
		var result = [];
		this.each(function(e)
		{
			Array.prototype.push.apply(result, predicate(e));
		}, this);
		return result;
	};


	$prototype.any = function(predicate /*, thisArg */)
	{
		arguments[0] = lambda(predicate);

		return Array.prototype.some.apply(this, arguments);
	};

	$prototype.where = function(predicate /*, thisArg */)
	{
		predicate = lambda(predicate);
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0,
			result = [];

		this.each(function(e, i, k)
		{
			if (predicate.call(thisArg, e, i, k, this))
				result.push(e);
		}, this);
		return result;

	};
	$prototype.one = function(predicate /*, thisArg */)
	{
		var
			context = arguments.length >= 2 ? arguments[1] : void 0,
			i = 0,
			names = Object.getOwnPropertyNames(this);

		if (names.length == 0) return;

		predicate.call(context, this[names[i]], 0, names[i], this);


	};

	$prototype.each = function(predicate /*, thisArg */)
	{
		var
			context = arguments.length >= 2 ? arguments[1] : void 0,
			i = 0, e,
			names = Object.getOwnPropertyNames(this);

		if (names.length == 0) return undefined;

		for (var i = 0; i < names.length; i++) {
			key = names[i];
		  predicate.call(context, this[key], i, key, this);
		};

		/*
		Object.getOwnPropertyNames(this).forEach(function(e)
		{
			predicate.call(thisArg, this[e], i, e, this);
			i++;
		}, this);
		*/
	};

	$prototype.reverse = function()
	{

	};

	$prototype.concat = function()
	{

	};
	$prototype.elementAt = function()
	{

	};
	$prototype.groupBy = function()
	{

	};
	$prototype.groupJoin = function()
	{

	};
OrderBy Range Single Skip SkipWhile Sum Take TakeWhile ThenBy ToArray ToDictionary Union Where Zip

	$prototype.count = function()
	{
		if (this.length != undefined) return this.length;
		return Object.getOwnPropertyNames(this).length;
	};


})(global || window);
