var result = {};

result.version = '0.0.01';
result = require('./System.js');
result.Linq = require('./System.Linq.js');
result.lambda = result.Linq.lambda;



if(module && module.exports) {
  module.exports = result;
}
