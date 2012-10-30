## newnew

`newnew` is the new `new`. 

### What? 

`newnew` is a function that replaces the `new` operator.

### Why??

`newnew` inherits the first-class nature of functions, allowing you to do a couple of cool things that you never could with `new`: 


##### Application

```javascript

var objects = [Object, Array, Function].map(newnew)
```

```javascript

var args = [MyCtor, [].slice.call(arguments)]

var o = newnew.apply(null, args)
```

## Getting

It's as simple as an npm:

```
npm install newnew

```
