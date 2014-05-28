require('./System/Array.js');
require('./System/Number.js');
require('./System/Object.js');
require('./System/String.js');

var result = require('./System/System.js');
result.Enum = require('./System/Enum.js');
result.Guid = require('./System/Guid.js');


if(module && module.exports) {
  module.exports = result;
}