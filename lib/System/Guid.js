(function(window)
{

  var Guid = {};
  Guid.New = function()
  {
    var hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var result = [];
    for (var i = 0; i < 32; i++)
      result.push(hex[Math.random()*16|0]);
    return result.join('');
  }


  if(module && module.exports) {
    module.exports = Guid;
  }
})(global || window);

