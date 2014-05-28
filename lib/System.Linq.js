var result = require('./System.Linq/System.Linq.js');
result.Enumerable = require('./System.Linq/Enumerable.js');
result.lambda = require('./System.Linq/lambda.js');


if(module && module.exports) {
  module.exports = result;
}