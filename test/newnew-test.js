var a      = require('assert'),
    newnew = require('../'),
    sinon  = require('sinon')
    throwsTypeError = function(ctor){
        a.throws(function(){ newnew(ctor) }, TypeError)
    }

var nonObject = [null, undefined, "", 1, false],
    nonConstruct = [{}, []]

suite('11.2.2 complicance: In the production NewExpression : new NewExpression')

test('3. If Type(constructor) is not Object, throw a TypeError exception', function(){
    nonObject.forEach(throwsTypeError)
})

test('4. If constructor does not implement the [[Construct]] internal method, throw a TypeError exception.', function(){
    nonConstruct.forEach(throwsTypeError)
})


test('5. Return[s the same] result [as] calling the [[Construct]] internal method on constructor, providing no arguments (that is, an empty list of arguments).', function(){
    
    var ctors = [
        function(){ this.testProp = 'test value' },
        function(){ this.testProp = 'test value'; return {} },
        function(){ this.testProp = 'test value'; return [] },
        function(){ this.testProp = 'test value'; return null },
        function(){ this.testProp = 'test value'; return true }
    ]

    ctors.forEach(function(Ctor){ Ctor.prototype = {} })

    ctors.forEach(function(Ctor){
        var o  = newnew(Ctor),
            o2 = new Ctor

        a.deepEqual(o, o2)
        a.equal(o instanceof Ctor, o2 instanceof Ctor)
        a.equal(Object.getPrototypeOf(o), Object.getPrototypeOf(o2))
    })
})


suite('11.2.2 complicance: In the production MemberExpression : new MemberExpression Arguments')

test('4. If Type(constructor) is not Object, throw a TypeError exception.', function(){
    nonObject.forEach(function(Ctor){
        a.throws(function(){ newnew(Ctor, 'test', 'args') }, TypeError)
    })
})

test('5. If constructor does not implement the [[Construct]] internal method, throw a TypeError exception.', function(){
    nonConstruct.forEach(function(Ctor){
        a.throws(function(){ newnew(Ctor, 'test', 'args') }, TypeError)
    })
})

test('6. Return the result of calling the [[Construct]] internal method on  constructor, providing the list argList as the argument values', function(){
    var Ctor = function(a, b){ this.a = a; this.b = b }

    a.deepEqual(new Ctor(1, 2), newnew(Ctor, 1, 2))
})


suite('generic tests')


test('it behaves like new on a custom-made constructor', function(){
    var Ctor  = function(){
            this.testProp = 'test value'
        }

    Ctor.prototype = {}
    
    var o = newnew(Ctor)
    
    a.deepEqual(o, new Ctor)
    a.equal(o.testProp, 'test value')
    a.ok(o instanceof Ctor)
})
