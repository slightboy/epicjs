var Enumerable = require('../System.Linq/Enumerable');

(function(window)
{


  function Enum(value)
  {
    Enumerable.each.call(value, this, function(e, i, k)
    {
      (this[k] = e).caller = this;
    });

    Object.freeze(this);

   
  };
  
  /*
  Enum.prototype.toString = function()
  {
    return '{'+ this.select('e => e.toString()').join(',') + '}'
  }

  Enum.prototype.eq = Enum.prototype.Equal = function(value)
  {
    return JSON.stringify(this);
  }



  Enum.defineField = function(name, value)
  {
    Object.defineProperty(this, name, {
            value: value,
            writable: false,
            enumerable: true,
            configurable: true
        });
  };
  */
 


  function Iterator(value, action)
  {
    if (Enum.Is(value))
    {
      var result = [];
      Enumerable.each.call(value, result, action);
      return result;
    }
    return [];
  }

  Enum.Is = function(value)
  {
    return value instanceof Enum;
  }

  Enum.Name = function(context, value)
  {
    return Iterator(context, function(v, i, n){if (v == value) this.push(n);});
  };
  Enum.Names = function(value)
  {
    return Iterator(value, function(v, i, n) { this.push(n) });
  };
  Enum.Values = function(value)
  {
    return Iterator(value, function(v, i, n) { this.push(v) });
  };
 
  if(module && module.exports) {
    module.exports = Enum;
  }

}
)(global || window);



