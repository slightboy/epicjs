require('./Object.js');

(function(window)
{


  function Enum(value)
  {


    value.each(function(v, i , n)
    {

      this[n] = v;
      this[n].caller = this;
    }, this);

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
      value.each(action, result);
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



