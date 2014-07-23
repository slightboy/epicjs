
var methods =
{

  any: function(value, fn)
  {
    if (fn == null) return;

    var result = false;
    function predicate(e, i , k, t)
    {
      if (fn(e, i, k, t) === true)
      {
        result = true;
        return false;
      }
    }

    epicjs.each(value, predicate);
    return result;
  },


  first: function(value, fn)
  {
    var result;

    function predicate(e, i , k, t)
    {
      if ((fn == null && i == 0) || (fn && fn(e, i, k, t) === true))
      {
        result = e;
        return false;
      }
    };

    epicjs.each(value, predicate);
    return result;
  },

  last: function(value, fn)
  {
    var result;

    function predicate(e, i, k, t)
    {
      if ((fn == null && (i+1) == len) || (fn && fn(e, i, k, t) === true))
      {
        result = e;
        return false;
      }
    };

    epicjs.eachR(value, predicate);
    return result;
  },

  select: function(value, fn)
  {
    if (fn == null) return;

    var result = [];
    function predicate(e, i , k, t)
    {
        result.push(fn(e, i, k, t));
    }

    epicjs.each(value, predicate);
    return result;
  },

  selectmany: function(value, fn)
  {
    if (fn == null) return;

    var result = [];
    function predicate(e, i , k, t)
    {
         Array.prototype.push.apply(result, fn(e, i, k, t));     
    }

    epicjs.each(value, predicate);
    return result;  
  },

  where: function(value, fn)
  {
    if (fn == null) return;

    var result = [];
    function predicate(e, i , k, t)
    {
      if (fn(e, i, k, t) === true)
        result.push(e);
    }

    epicjs.each(value, predicate);
    return result; 
  },


  // 正向
  each: function(value, fn)
  {

    if (value == null)
      throw new TypeError(" this is value or not defined");
    if (fn == null) return;

    var o = Object(value);
    var key, keys = Object.keys(o);
    var i = 0, len = keys.length;

    while(i < len)
    {
      key = keys[i];
      // value index key count
      if (fn.call(null, o[key], i, key, len) === false) break;
      i++;
    }
  },
  // 反向
  eachR: function(value, fn)
  {

    if (value == null)
      throw new TypeError(" this is value or not defined");
    if (fn == null) return;

    var o = Object(value);
    var key, keys = Object.keys(o);
    var len = keys.length, i = len - 1;

    while(i >= 0)
    {
      key = keys[i];
      // value index key count
      if (fn.call(null, o[key], i, key, len) === false) break;
      i--;
    }
  }
};



function epicjs(value)
{
  this.value = value;


}


(function(content)
{
  methods.each(methods, function(e, i, k)
  {
    content[k] = e;
  });
})(epicjs);


(function(content)
{
  methods.each(methods, function(e, i, k)
  {
    content[k] = function(fn)
    {
      var result = e(this.value, fn);
      if (result) this.value = result;
      return result;
    };
  });
})(epicjs.prototype);


console.log(epicjs.any);

var x = new epicjs([1,2,3]);


console.log(x.where(function(e){ return e > 2; }));

console.log(x.value);


var j = function()
{
  return new j.fn.init();
}


j.fn = j.prototype = 
{
  alert: function()
  {
    console.log('test');
  }
}

j.fn.init = function()
{
  this.context = 1;

  return this;
}



var a = j('a');

