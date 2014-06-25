




function Epic()
{
  this.value;
};


Object.defineProperties(Epic.prototype,
{
  'each':
  {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(thisArg, predicate, context)
    {
      if (thisArg == null) throw new TypeError(" thisArg is null or not defined");

      var o = Object(thisArg),
        len = o.length >>> 0
        i = 0,
        n;

      if (len > 0)
      {
        while(i < len)
        {
          if (i in o)
            predicate.call(context, o[i], i, i, o);
          i++;
        }
        return;
      }

      var keys = (function(e){ len = e.length; return e;})(Object.getOwnPropertyNames(o));

      while(i < len)
      {
        n = keys[i];
        if (n in o)
          predicate.call(context, o[n], i, n, o);
        i++;
      };
    }
  },
  'last':
  {

  },

});

var $ = new Epic();

var aa = {'a': 1, 'b': 2};
var bb = [1,2];

$.each(aa, function(e, i, n)
{
  console.log('v: %s, i: %d, n: %s', e, i, n);
});

$.each(bb, function(e, i, n)
{
  console.log('v: %s, i: %d, n: %s', e, i, n);
});




  if (!Object.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(predicate) {
        if (this == null) throw new TypeError('Array.prototype.find called on null or undefined');

        predicate = lambda(predicate);
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          if (i in list) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
              return value;
            }
          }
        }
        return undefined;
      }
    });
  };



Object.prototype.test = function()
{

};
var a = {};
a['a'] = 1;
for(var n in a)
{

  console.log(n);
}


