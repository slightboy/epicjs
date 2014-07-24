var lambda = require('./lambda');



function argTest(v1)
{
  v1 = {};
  var value = [];
  value.push(arguments[0]);
  console.log(Array.prototype.push.apply(value, Array.prototype.slice.call(arguments, 1)[0]));


  console.log(value);
}


argTest('a', [1,2, 3]);

return;

console.log(lambda('e => e').toString());
console.log(lambda('() => 1').toString());
function action(e){ return e; };


console.log(lambda('e => action(e)', action).toString());



return;



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


