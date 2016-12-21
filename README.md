WeakTupleMap [![npm version](https://badge.fury.io/js/weaktuplemap.svg)](https://badge.fury.io/js/weaktuplemap) [![Build Status](https://travis-ci.org/memoize-immutable/WeakTupleMap.svg?branch=master)](https://travis-ci.org/memoize-immutable/WeakTupleMap) [![Dependency Status](https://david-dm.org/memoize-immutable/WeakTupleMap.svg)](https://david-dm.org/memoize-immutable/WeakTupleMap) [![Coverage Status](https://coveralls.io/repos/github/memoize-immutable/WeakTupleMap/badge.svg?branch=master)](https://coveralls.io/github/memoize-immutable/WeakTupleMap?branch=master)
============

A WeakMap which accepts multiple objects as a key.
This lib is one of the several possible cache for [memoize-immutable](/louisremi/memoize-immutable),
but it can suit other use-cases as it implements a usual Map API.

## Install

`npm install --save WeakTupleMap`

This lib has no dependency, but requires a native implementation of WeakMap.

## Usage

**Restrictions**. A WeakTupleMap can only be used when:
  - The key is only made of parts that have a non-primitive type
    (`object`, `array`, or `function`).
  - The key always has the same number of parts.

```js
var WeakTupleMap = require('WeakTupleMap');

var cache = new WeakTupleMap();

var keyPart1 = {};
var keyPart2 = function() { return 'yolo'; };
var keyPart3 = [];
var value = {any: 'thing'};

// Note that following keyPart tuples are wrapped in new arrays that are !==
// (otherwise a WeakMap would have been enough).
cache.set([keyPart1, keyPart2, keyPart3], value);

cache.has([keyPart1, keyPart2, keyPart3]) === true;
cache.get([keyPart1, keyPart2, keyPart3]) === value;
```

## Author

[@louis_remi](https://twitter.com/louis_remi)

## License

MPL-2.0
