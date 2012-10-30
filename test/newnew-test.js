var a      = require('assert'),
    newnew = require('../'),
    sinon  = require('sinon')
    throwsTypeError = function(ctor){
        a.throws(function(){ newnew(ctor) }, TypeError)
    }



suite('11.2.2 complicance: In the production NewExpression : new NewExpression')

test('3. If Type(constructor) is not Object, throw a TypeError exception', function(){
    var badTypes        = [null, "", 1, false]

    badTypes.forEach(throwsTypeError)
})

test('4. If constructor does not implement the [[Construct]] internal method, throw a TypeError exception.', function(){
    var noConstruct = [{}, []]

    noConstruct.forEach(throwsTypeError)
})


test('5. Return[s the same] result [as] calling the [[Construct]] internal method on constructor, providing no arguments (that is, an empty list of arguments).', function(){
    
    var ctors = [
        function(){ this.testProp = 'test value' },
        function(){ return {} },
        function(){ return [] },
        function(){ return null },
        function(){ return true }
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
