"use strict";
var epic = require('./index.js'),
	System = require('./index.js').System;


var a = [1,2,3];
var b = [3,4,5];

function test(item)
{
  return item > 2;
};

/*
var t = eval('new function a(){}');
t.name = 'ttt';
console.log(t.name);
*/


console.log(a.where('e => test(e)', test, 'e => e > 2', 'e => e > 3'));

