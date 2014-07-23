var count = 0;
// console.log("count: %d", ++count);
var epicjs = 
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
  },


}

function $e(value)
{
  return new ei(value);
}

function ei(value)
{
  this.value = value;
}

var proto = ei.prototype;

proto.any = function(fn)
{
  return epicjs.any(this.value, fn);
}
proto.first = function(fn)
{
  epicjs.first(this.value, fn);
  return this;
}
proto.last = function(fn)
{
  epicjs.last(this.value, fn);
  return this;
}
proto.select = function(fn)
{
  this.value = epicjs.select(this.value, fn);
  return this;
}
proto.selectmany = function(fn)
{
  this.value = epicjs.selectmany(this.value, fn);
  return this;
}
proto.where = function(fn)
{
  this.value = epicjs.where(this.value, fn);
  return this;
}

proto.each = function(fn)
{
  epicjs.each(this.value, fn);
  return this;
}
proto.eachR = function(fn)
{
  epicjs.eachR(this.value, fn);
  return this;
}



//each([1, 2, 3]);

//each({a: 'a', b: 'b', c: 'c'});

//each([{a: 'a', b: 'b', c: [1,2,3]}]);

function each(v)
{

  var result = epicjs.where(v, function(e, i, k)
  {
    return e > 1;
  });

  console.log(result);

  console.log("---");
}

//console.log($e([1, 2, 3]).where(function(e) { return e > 1; }));



function test()
{

}

test.prototype.a = function()
{
  console.log("1");
}

test.a = function()
{
  console.log("2");
}

var tt = new test();

tt.a()