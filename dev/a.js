var a =  {a:1};


var e = function(){};

e.prototype =
{
  test: function()
  {
    return 1;
  }
}

a.__proto__ = e.prototype;

console.log(a.__proto__);
console.log(a.test());

var b = {};

console.log(b.__proto__);