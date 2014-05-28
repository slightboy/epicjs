var Benchmark = require('benchmark'),
	epic = require('../index');




var suite = new Benchmark.Suite;

// add tests
suite.add('String#startsWith chatAt', function() {
  'abc'.startsWith('ab');
})
.add('String#startsWith substr', function() {
  'abc'.substr(0, 'ab'.length) === 'ab';
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });

var suite2 = new Benchmark.Suite;
suite2.add('String#endsWith chatAt', function() {
  'abc'.endsWith('bc');
})
.add('String#endsWith substr', function() {
  'abc'.substr('abc'.length - 'ab'.length) === 'bc';
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });