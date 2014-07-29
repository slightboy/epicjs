var
  Config = require('../Config/System.json'),
  Enum = require('./Enum.js');

(function(window)
{
  var $type = String,
    $prototype = $type.prototype;

  $type.__typeName = 'string';
  //$type.__typeCode = TypeCode.String;
  $type.__class = true;

  // StringComparison Enum
  window['StringComparison'] = new Enum(Config.StringComparison);

  var StringEx = 
  {
    hashCode: function()
    {
      var hash = 5381,i = this.length

        while(i)
          hash = (hash * 33) ^ this.charCodeAt(--i)
        return hash >>> 0;
    },

    startsWith: function(value)
    {
      var comparison = 0;
      if (arguments.length > 1 && typeof(arguments[arguments.length - 1]) === 'number')
      {
        comparison = arguments[arguments.length - 1];
        arguments.pop();
      };

      var item;
      for(var i = 0; i < arguments.length; i++)
      {
        item = arguments[i];
        if (typeof(item) === 'string' && startsWith(this, item, comparison))
          return true;
        if (Array.isArray(item) && item.any(function(e){ return startsWith(this, e, comparison) }, this))
          return true;
      }
      return false;
    },

    endsWith: function(value)
    {
      var comparison = 0;
      if (arguments.length > 1 && typeof(arguments[arguments.length - 1]) === 'number')
      {
        comparison = arguments[arguments.length - 1];
        arguments.pop();
      }

      var item;
      for(var i = 0; i < arguments.length; i++)
      {
        item = arguments[i];
        if (typeof(item) === 'string' && endsWith(this, item, comparison))
          return true;
        if (Array.isArray(item) && item.any(function(e){ return endsWith(this, e, comparison) }, this))
          return true;
      }
      return false;
    },

    format: function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    }

  };



  function startsWith(strA, strB, stringComparison)
  {
    if (strB.length === 0) return true;
    if (strA === strB) return true;
    if (strB.length > strA.length) return false;



    return stringComparison === 1 ? 
        CompareOrdinalIgnoreCaseEx(strA, 0, strB, 0, strB.length, strB.length) : 
        compareOrdinalEx(strA, 0, strB, 0, strB.length, strB.length);
  }


  function endsWith(strA, strB, stringComparison)
  {

    if (strB.length === 0) return true;
    if (strA.length === strB.length && strA === strB) return true;
    if (strB.length > strA.length) return false;
    return stringComparison === 1 ? 
        CompareOrdinalIgnoreCaseEx(strA, strA.length - strB.length, strB, 0, strB.length, strB.length) : 
        compareOrdinalEx(strA, strA.length - strB.length, strB, 0, strB.length, strB.length);
  };

  // CompareOrdinalIgnoreCaseEx(this, 0, value, 0, value.Length, value.Length) == 0
  // CompareOrdinalIgnoreCaseEx(this, this.Length - value.Length, value, 0, value.Length, value.Length) == 0;

  function compareOrdinalEx(strA, offsetA, strB, offsetB, lengthA, lengthB)
  {
    for (var i = 0; i < lengthA; i++)
    {
      //console.log('A: %s, B: %s', strA.charAt(offsetA + i), strB.charAt(offsetB + i));
      if (strA.charAt(offsetA + i) !== strB.charAt(offsetB + i)) return false;
    };
    return true;
  };

  function compareOrdinalIgnoreCaseEx(strA, offsetA, strB, offsetB, lengthA, lengthB)
  {

  };


  function charCompareOrdinalIgnoreCaseEx(charCodeA, charCodeB)
  {
    if (charCodeA === charCodeB) return true;
    if ((charCodeA > 64 && charCodeA < 123) && (charCodeB > 64 && charCodeB < 123))
    {
      if ((charCodeA + 32) === charCodeB) return true;
      if ((charCodeA - 32) === charCodeB) return true;
    }
    return false;
  };


  if(module && module.exports)
    module.exports = StringEx;

})(global || window);

