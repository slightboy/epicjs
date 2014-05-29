var System = require('../index.js');

function selectTest()
{
  var o = {a:1, b:2};
  console.log('function: %j', o.select(function(e) { return e; }));
  console.log('e => e > 1: %j', o.select('e => e'));

  var n = {};
  console.log('{} function: %j', n.select(function(e) { return e.id; }));
  console.log('{} e => e > 1: %j', n.select('e => e.id'));

}


function selectmanyTest()
{
  var o = {a : [1,2], b:[3,4]};
    console.log('function: %j', o.selectmany(function(e) { return e; }));
  console.log('e => e: %j', o.selectmany('e => e'));
}

function whereTest()
{
  var o = {a:1, b:2};
  console.log('function: %j', o.where(function(e) { return e > 1; }));
  console.log('e => e > 1: %j', o.where('e => e > 1'));

  var n = {};
  console.log('{} function: %j', n.where(function(e) { return e.id > 1; }));
  console.log('{} e => e > 1: %j', n.where('e => e.id > 1'));

}
//selectTest();
selectmanyTest();

function d()
{
  console.log((arguments).count());
  console.log(({a:1}).count());
}
d();
//whereTest();
