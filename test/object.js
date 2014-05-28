var System = require('../index.js');

var o = {a:1, b: 2};


var r = o.where('e => e > 1');

console.log(r);