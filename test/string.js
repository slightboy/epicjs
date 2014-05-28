var epic = require('../index');
require('colors');

var test = 'abc';

console.log('Word: test'.green);

console.log('startsWith true = %s', test.startsWith('a'));
console.log('endsWith true = %s', test.endsWith('c'));

console.log('startsWith false = %s', test.startsWith('b'));
console.log('endsWith false = %s', test.endsWith('a'));


console.log('muti: testing'.green);

console.log('startsWith true = %s', test.startsWith('a', 'b', 'c'));
console.log('endsWith true = %s', test.endsWith('a', 'b', 'c'));

console.log('startsWith false = %s', test.startsWith('e', 'e', 'f'));
console.log('endsWith false = %s', test.endsWith('e', 'e', 'f'));


console.log('Array: testing'.green);

console.log('startsWith true = %s', test.startsWith(['a', 'b', 'c']));
console.log('endsWith true = %s', test.endsWith(['a', 'b', 'c']));

console.log('startsWith false = %s', test.startsWith(['d', 'e', 'f']));
console.log('endsWith false = %s', test.endsWith(['d', 'e', 'f']));


console.log('mix: testing'.green);

console.log('startsWith true = %s', test.startsWith('a', ['b', 'c']));
console.log('endsWith true = %s', test.endsWith('a', ['b', 'c']));

console.log('startsWith false = %s', test.startsWith('d', ['e', 'f']));
console.log('endsWith false = %s', test.endsWith('d', ['e', 'f']));