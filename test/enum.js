var System = require('../index.js');

var testEnums = new System.Enum({a:1, b:2});
console.log(TypeCode.Object);
console.log(testEnums.a);
console.log(System.Enum.Name(testEnums, testEnums.a));
console.log(System.Enum.Names(testEnums));
console.log(System.Enum.Values(testEnums));