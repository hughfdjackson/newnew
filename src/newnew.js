
module.exports = function(Ctor){
    var args = [].slice.call(arguments, 1)

    var o = Object.create(Ctor.prototype)

    Ctor.apply(o, args)

    return o
}
