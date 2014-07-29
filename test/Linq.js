var assert = require("assert");
var $ = require('../').Linq;


describe('linq', function()
{
  var a = [ [1,2], [3,4] ].linq();
  var o = [ { a: [1,2], b:1 }, { a:[3,4], c:4 } ].linq();




  describe('#any', function()
  {
    it('array exists', function()
    {
      assert.ok(a.any('e => e[0]'));
    })

    it('array not exists', function()
    {
      assert.ok(!a.any('e => e[3]'));
    })

    it('array exp exists', function()
    {
      assert.ok(a.any('e => e[0] > 2'));
    })

    it('array exp not exists', function()
    {
      assert.ok(!a.any('e => e[0] > 4'));
    })



    it('object exists', function()
    {
      assert.ok(o.any('e => e.a'));
    })

    it('object not exists', function()
    {
      assert.ok(!o.any('e => e.x'));
    })

    it('object exp exists', function()
    {
      assert.ok(o.any('e => e.a.length > 0'));
    })

    it('object exp not exists', function()
    {
      assert.ok(!o.any('e => e.a.length < 0'));
    })

  });


  describe('#first', function()
  {



    it('array with fn', function()
    {
      assert.deepEqual([3, 4], a.first('e => e[0] > 2'));
    })

    
    it('object', function()
    {
      assert.deepEqual( {"a":[3,4],"c":4}, o.first('e => e.c'));
    })

  });


  describe('#select', function()
  {

    it('empty', function()
    {
      var o = [].linq();
      assert.deepEqual([], o.select('e => e.a'));
    })

    it('array', function()
    {
      assert.deepEqual([1, 3], a.select('e => e[0]'));
    })

    it('object', function()
    {
      assert.deepEqual( [[1,2],[3,4]], o.select('e => e.a'));
    })
  });

  describe('#selectmany', function()
  {

    it('array', function()
    {
      assert.deepEqual([1, 3], a.selectmany('e => e[0]'));
    })

    it('object', function()
    {
      assert.deepEqual([1, 2, 3, 4], o.selectmany('e => e.a'));
    })

  });


  describe('#where', function()
  {

    it('array', function()
    {
      assert.deepEqual([[3, 4]], a.where('e => e[0] > 2'));
    })

    it('object', function()
    {
      assert.deepEqual([{a : [3,4]}], o.where('e => e.a[0] > 2'));
    })

  });


});
