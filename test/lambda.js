var assert = require("assert");
var lambda = require('../lib/System.Linq/lambda.js');



describe('lambda', function()
{
  describe('#basic', function()
  {

    it('compile', function()
    {
      var func = lambda('e => e');
      assert.equal(1, func(1));
    })

  })


  describe('#cache', function()
  {

    it('should equal', function()
    {
      var func1 = lambda('e => e');
      var func2 = lambda('e => e');
      assert.equal(func1, func2);
    })
  })


  describe('#adv function', function()
  {

    it('named method', function()
    {
      function action(e) { return e; };
      var func = lambda('e => action(e)', action);
      assert.equal(1, func(1));
    })

    it('tow named method', function()
    {
      function action1(e) { return e; };
      function action2(e) { return e; };
      var func = lambda('e => action1(action2(e))', action1, action2);
      assert.equal(1, func(1));
    })

    it('three named method', function()
    {
      function action1(e) { return e; };
      function action2(e) { return e; };
      function action3(e) { return e; };
      var func = lambda('e => action1(action2(action3(e)))', action1, action2, action3);
      assert.equal(1, func(1));
    })

    it('array named method', function()
    {
      function action1(e) { return e; };
      function action2(e) { return e; };
      function action3(e) { return e; };
      var func = lambda('e => action1(action2(action3(e)))', [action1, action2, action3]);
      assert.equal(1, func(1));
    })

  })


  describe('#adv with anonymous function', function()
  {

    it('anonymous method', function()
    {
      var func = lambda('e => $f0(e)', function(e) { return e; });
      assert.equal(1, func(1));
    })

    it('tow anonymous method', function()
    {
      var func = lambda('e => $f0($f1(e))', function(e) { return e; }, function(e) { return e; });
      assert.equal(1, func(1));
    })

    it('three anonymous method', function()
    {
      var func = lambda('e => $f0($f1($f2(e)))', function(e) { return e; }, function(e) { return e; }, function(e) { return e; });
      assert.equal(1, func(1));
    })

    it('array anonymous method', function()
    {
      var func = lambda('e => $f0($f1(e))', [function(e) { return e; }, function(e) { return e; }, function(e) { return e; }]);
      assert.equal(1, func(1));
    })


  })




  describe('#adv with lambda', function()
  {

    it('lambda', function()
    {
      var func = lambda('e => $f0(e)', 'e => e');
      assert.equal(1, func(1));
    })

    it('tow lambda', function()
    {
      var func = lambda('e => $f0($f1(e))', 'e => e', 'e => e');
      assert.equal(1, func(1));
    })

    it('three lambda', function()
    {
      var func = lambda('e => $f0($f1($f2(e)))', 'e => e', 'e => e', 'e => e');
      assert.equal(1, func(1));
    })

    it('array lambda', function()
    {
      var func = lambda('e => $f0($f1(e))', ['e => e', 'e => e', 'e => e']);
      assert.equal(1, func(1));
    })   


  })




})