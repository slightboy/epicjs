
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


			var args;
			if (arguments.length > 1)
			{
				if (arguments.length == 2 || Array.isArray(arguments[1]))
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

			if (args.action)
				args.hash = hashCode(args.exp + args.action.join(';'));
			else
				args.hash = hashCode(args.ex));


			if(args.hash in cache)
				return cache[args.hash];

			lambda.precompile(args);

			var token = lambda.parser(args.exp);


			cache[key] = {};
			token.push(predicates);a
			return cache[key] = lambda.create.pply(this, token);

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
		var parameters = [], expression, whitespaces = [' ', '	', '(', ')' , ','], part = [];

		for (var i = 0; i < value.length; i++)
		{
			
			if (function(character)
			{

				if (whitespaces.some(function(e){ return e === character; }))
				{

					if (part.length != 0)
					{
						parameters.push(part.join(''));
						part.length = 0;
					}

					if (parameters[parameters.length - 1] === '=>')
					{
						parameters.pop();
						expression = value.substr(i + 1);
						return true;
					}
					return false;
				}
				part.push(character);
				return false;

			}(value.charAt(i)))
				break;
		};
		return [parameters, expression];
	};

	lambda.transformer = function(args, func)
	{
		for (var i = 0; i < args.action.length; i++) {
			
		};
	};

	lambda.create = function(parameters, expression, predicates)
	{
		//var result = 'new function({0}){ {1} return {2}; }'.format(parameters.join(','), predicates.length > 0 ? predicates.join(';') +';' : '', expression);
		//return eval(result);
		//if (parameters.length == 0) return new Function('return '+ expression)
		if (predicates.length > 0)
			return new Function(parameters, predicates.join(';') +';return '+ expression);
		return new Function(parameters, 'return '+ expression);
	}



	function hashCode(value)
	{
		var hash = 5381,i = value.length

		  while(i)
		    hash = (hash * 33) ^ value.charCodeAt(--i)
		  return hash >>> 0;
	};

	lambda.version = '0.0.01';
	if(module && module.exports) {
		module.exports = lambda;
	}


})(global || window);
