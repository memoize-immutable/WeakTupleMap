'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function WeakTupleMap() {
  this.clear();
}

WeakTupleMap.prototype = {
  toString: function toString() {
    return '[object WeakTupleMap]';
  },
  has: function has(tuple) {
    var curr = this._cache;
    var l = tuple.length;

    for (var i = 0; i < l; i++) {
      if (!curr.has || !curr.has(tuple[i])) {
        return false;
      }
      curr = curr.get(tuple[i]);
    }

    return true;
  },

  set: function set(tuple, value) {
    var curr = this._cache;
    var l = tuple.length;
    var mustCreate = false;

    for (var i = 0; i < l - 1; i++) {
      if (!mustCreate && curr.has(tuple[i])) {
        curr = curr.get(tuple[i]);
      } else {
        mustCreate = true;
        curr.set(tuple[i], curr = new WeakMap());
      }
    }

    curr.set(tuple[l - 1], value);

    return this;
  },

  get: function get(tuple) {
    var curr = this._cache;
    var l = tuple.length;

    for (var i = 0; i < l; i++) {
      var ret = curr.get && curr.get(tuple[i]);
      if (ret === undefined) {
        return ret;
      } else {
        curr = ret;
      }
    }

    return curr;
  },

  clear: function clear() {
    this._cache = new WeakMap();
  }
};

exports.default = WeakTupleMap;
module.exports = exports['default'];

//# sourceMappingURL=index.js.map