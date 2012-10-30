var a      = require('assert'),
    newnew = require('../')


suite('newnew')

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
