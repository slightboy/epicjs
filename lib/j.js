

var method = new Function(['action', 'x'], "action(x + x);");


var methodA = function()
{
  console.log(arguments[0].displayName);
  method.apply(null, arguments);
};



console.log([Math.random(), Math.random(), Math.random()]);



methodA(  function act(e)
{
  console.log(e);
}, 1);


