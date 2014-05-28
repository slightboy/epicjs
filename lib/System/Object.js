var lambda = require('../System.Linq/lambda.js');

(function(window)
{

	Object.prototype.select = function(func)
	{
		func = lambda(func);
		var result = [];
		this.forEach(function(e)
		{
			result.push(func(e));
		}, this);
		return result;
	};

	Object.prototype.selectmany = function(e)
	{
		func = lambda(func);
		var result = [];
		for (var key in this)
			result = result.concat(e(this[key]));
		return result;
	}


	Object.prototype.any = function(func /*, thisArg */)
	{
		arguments[0] = lambda(func);

		return Array.prototype.some.apply(this, arguments);
	}


	Object.prototype.where = function(func /*, thisArg */)
	{
		func = lambda(func);
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0,
			result = [];

		this.each(function(e, i, k)
		{
			if (func.call(thisArg, e, i, k, this))
				result.push(e);
		}, this);
		return result;

	}
	Object.prototype.each = function(func /*, thisArg */)
	{
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0,
			i = 0;
		Object.getOwnPropertyNames(this).forEach(function(e)
		{
			func.call(thisArg, this[e], i, e, this);
			i++;
		}, this);
	}



})(global || window);
