
/*


        "(\\d)\\s+(\\.\\s*[a-z\\$_\\[(])": "$1 $2",
        "([+-])\\s+([+-])": "$1 $2",
        "\\b\\s+\\$\\s+\\b": " $ ",
        "\\$\\s+\\b": "$ ",
        "\\b\\s+\\$": " $",
        "\\b\\s+\\b": SPACE,
        "\\s+": REMOVE

 */
(function(window)
{

	var lambda = (function()
	{
		var cache = {};
		return function(value)
		{
			if (!value) return null;
			if (typeof(value) == 'function') return value;


			var args;
			if (arguments.length > 1)
			{
				if (arguments.length == 2 && Array.isArray(arguments[1]))
				{
					args = [arguments[0]];
					Array.prototype.push.apply(args, arguments[1]);
					return lambda.apply(null, args);
				}

				args = {exp: arguments[0], action: Array.prototype.slice.call(arguments, 1)};
			}
			else
				args = {exp: arguments[0]};

			if (typeof(args.exp) != 'string')
				throw new TypeError('required lambda expressions.');

			args.hash = hash(args.exp + (args.action && args.action.length > 0 ? args.action.join(';') : ''));


			if(args.hash in cache)
			{
				cache[args.hash].hit++;
				return cache[args.hash].func;
			}

			lambda.precompile(args);

			var func = lambda.parser(args.exp);
			return (cache[args.hash] = { func:lambda.create(args, func), hit: 0 }).func;

		};

	})();

	lambda.precompile = function(args)
	{
		if (!args.action || args.action.length == 0) return;

		for (var i = 0; i < args.action.length; i++)
		{
			if (typeof(args.action[i]) == 'string')
				args.action[i] = lambda(args.action[i]);
		};
	}
	
	lambda.parser = function(value)
	{
		var result = {params: [], body: ''},
				whitespaces = [' ', '	', '(', ')' , ','],
				part = [];

		for (var i = 0; i < value.length; i++)
		{
			
			if (function(character)
			{

				if (whitespaces.some(function(e){ return e === character; }))
				{

					if (part.length != 0)
					{
						result.params.push(part.join(''));
						part.length = 0;
					}

					if (result.params[result.params.length - 1] === '=>')
					{
						result.params.pop();
						result.body = value.substr(i + 1);
						return true;
					}
					return false;
				}
				part.push(character);
				return false;

			}(value.charAt(i)))
				break;
		};
		return result;
	};

	lambda.transformer = function(args, func)
	{
		for (var i = 0; i < args.action.length; i++) {
			
		};
	};

	lambda.create = function(args, func)
	{
		if (!args.action || args.action.length == 0)
			return new Function(func.params, 'return '+ func.body);


		var count = 0, params = [];

		for (var i = 0; i < args.action.length; i++)
			params.push(args.action[i].name || '$f'+ (count++));


		Array.prototype.push.apply(params, func.params);

		var action = new Function(params, 'return '+ func.body);


		return function()
		{
			var p = args.action;
			Array.prototype.push.apply(p, arguments);
			return action.apply(null, p);
		};

	}



	function hash(value)
	{
		return value;
		var hash = 5381,i = value.length;
	  while(i)
	    hash = (hash * 33) ^ value.charCodeAt(--i)
	  return hash >>> 0;
	};

	lambda.version = '0.0.10';
	if(module && module.exports)
		module.exports = lambda;


})(global || window);
