var lambda = require('../System.Linq/lambda.js');


(function(window)
{
  Number.prototype.any = function(func)
  {
    return (lambda(func))(this);
  };
 
})(global || window);




