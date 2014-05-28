//var lambda = require('../lib/System.Linq/lambda.js');

function test()
{
  eval('function x(e){return e;};');
  console.log(x(1));

}
test();


return;
console.log(lambda('e => e').toString());
console.log(lambda('() => 1').toString());
function action(e){ return e; };


console.log(lambda('e => action(e)', action).toString());
