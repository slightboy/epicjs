
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

			if (value instanceof Function) return value;
			if (typeof(value) !== 'string') throw new TypeError('need lambda string');

			var key, predicates = [];
			if (arguments.length > 1)
			{
				Array.prototype.slice.call(arguments, 1).forEach(function(e){ predicates.push((typeof(e) === 'string') ? lambda(e) : e); });
				key = hashCode((value + predicates.join(';')));
			}
			else
			{
				key = hashCode(value);
			}


			if(key in cache)
				return cache[key];

			var token = lambda.parser(value);

			cache[key] = {};
			token.push(predicates);
			return cache[key] = lambda.create.apply(this, token);

		};

	})();


	
	lambda.create = function(parameters, expression, predicates)
	{
		//var result = 'new function({0}){ {1} return {2}; }'.format(parameters.join(','), predicates.length > 0 ? predicates.join(';') +';' : '', expression);
		//return eval(result);
		//if (parameters.length == 0) return new Function('return '+ expression)
		if (predicates.length > 0)
			return new Function(parameters, predicates.join(';') +';return '+ expression);
		return new Function(parameters, 'return '+ expression);
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
