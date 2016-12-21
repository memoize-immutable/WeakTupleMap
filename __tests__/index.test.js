import WeakTupleMap from '../index';

describe('WeakTupleMap', () => {
  let cache
  const obj = {'Carole Granade-Segers': 'Human unicorn'};
  const arr = ['Carole', 'Granade', 'Segers', 'we', 'love', 'you'];
  const fun = function() { return 'president forever'; };
  const res = ['♥'];

  beforeEach(() => {
    cache = new WeakTupleMap();
  });

  describe('#set', () => {
    it('should work with `({})`', () => {
      expect(cache._cache).toBeInstanceOf(WeakMap);

      cache.set([obj], 'Carole');

      expect(cache._cache.get(obj)).toEqual('Carole');
    });

    it('should work with `({}, [])`', () => {
      expect(cache._cache).toBeInstanceOf(WeakMap);

      cache.set([obj, arr], 'Carole');

      expect(cache._cache.get(obj)).toBeInstanceOf(WeakMap);
      expect(cache._cache.get(obj).get(arr)).toEqual('Carole');

      cache.set([obj, arr], fun);

      expect(cache._cache.get(obj).get(arr)).toEqual(fun);
    });
  });

  describe('#set, #has and then #get', () => {
    it('should work with `({})`', () => {
      cache.set([obj], res);

      expect(cache.has([obj])).toEqual(true);
      expect(cache.has([arr])).toEqual(false);
      expect(cache.get([obj])).toBe(res);
      expect(cache.get([fun])).toEqual(undefined);
    });

    it('should work with ({}, [])', () => {
      cache.set([obj, arr], res);

      expect(cache.has([obj, arr])).toEqual(true);
      expect(cache.get([obj, arr])).toBe(res);

      cache.set([obj, arr], fun);

      expect(cache.has([obj, arr])).toEqual(true);
      expect(cache.get([obj, arr])).toBe(fun);

      expect(cache.has([arr, obj])).toEqual(false);

      cache.set([arr, obj], res);

      expect(cache.has([arr, obj])).toEqual(true);
      expect(cache.get([arr, obj])).toBe(res);
    });
  });

  describe('.toString', () => {
    it('should return a special identifier', () => {
      expect(cache.toString()).toEqual('[object WeakTupleMap]');
    });
  });
});
