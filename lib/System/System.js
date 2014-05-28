var Enum = require('./Enum.js'),
Config = require('../Config/System.json');

(function(window)
{

  window.TypeCode = new Enum(Config.TypeCode);

  var System = {};


  System['typeof'] = function(value)
  {
    switch(System.TypeCode(value))
    {
      case TypeCode.Object :
        return Object;
      case TypeCode.Function :
        return Function;
      case TypeCode.Boolean :
        return Boolean;
      case TypeCode.Number :
        return Number;
      case TypeCode.Date :
        return Date;
      case TypeCode.String :
        return String;
      case TypeCode.RegExp :
        return RegExp;
      case TypeCode.Array :
        return Array;
      case TypeCode.Error :
        return Error;



    }
  };
  
  System.TypeCode = function(value)
  {
    switch(typeof(value))
    {
      case 'object' :
        if (value instanceof Array)
          return TypeCode.Array;
          if (value instanceof Date)
          return TypeCode.Date;
        if (value instanceof RegExp)
          return TypeCode.RegExp;
        if (value instanceof Error)
          return TypeCode.Error;
        return TypeCode.Object;
      case 'function' :
        return TypeCode.Function;
      case 'boolean' :
        return TypeCode.Boolean;
      case 'number' :
        return TypeCode.Number;
      case 'date' :
        return TypeCode.Date;
      case 'string' :
        return TypeCode.String;

    }
  };


  /*
  var type =[
    {},
    function(){},
    true,
    1,
    new Date(),
    '',
    /abc/,
    [],
    new TypeError()
    ];
  type.each(function(item)
  {
    console.log(typeof(item) +',  '+ System.typeof(item));
  });
  */

  if(module && module.exports) {
    module.exports = System;
  }
})(global || window);
