
module.exports = function(Ctor){
    var args = [].slice.call(arguments, 1),
        o    = Object.create(Ctor.prototype)

    var ret = Ctor.apply(o, args)

    return typeof ret == 'object' && ret !== null ? ret : o
}
