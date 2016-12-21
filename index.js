function WeakTupleMap() {
  this.clear();
}

WeakTupleMap.prototype = {
  toString: function() {
    return '[object WeakTupleMap]';
  },
  has: function( tuple ) {
    let curr = this._cache;
    const l = tuple.length;

    for( let i = 0; i < l; i++) {
      if ( !curr.has || !curr.has(tuple[i]) ) {
        return false;
      }
      curr = curr.get(tuple[i]);
    }

    return true;
  },

  set: function( tuple, value ) {
    let curr = this._cache;
    const l = tuple.length;
    let mustCreate = false;

    for( let i = 0; i < l - 1; i++) {
      if ( !mustCreate && curr.has(tuple[i]) ) {
        curr = curr.get(tuple[i]);
      } else {
        mustCreate = true;
        curr.set( tuple[i], ( curr = new WeakMap() ) );
      }
    }

    curr.set(tuple[l - 1], value);

    return this;
  },

  get: function( tuple ) {
    let curr = this._cache;
    const l = tuple.length;

    for( let i = 0; i < l; i++) {
      const ret = curr.get && curr.get(tuple[i]);
      if ( ret === undefined ) {
        return ret;
      } else {
        curr = ret;
      }
    }

    return curr;
  },

  clear: function() {
    this._cache = new WeakMap();
  },
};

export default WeakTupleMap;
