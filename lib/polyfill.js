// NOT USED YET
// https://medium.com/@artemkhrenov/javascript-grouping-methods-object-groupby-and-map-groupby-5bcb0e2134bf

// Simple polyfill for Object.groupBy
if (typeof Object.groupBy !== 'function') {
  Object.groupBy = function(array, callbackFn) {
    return array.reduce((result, item) => {
      const key = String(callbackFn(item));
      if (!Object.hasOwn(result, key)) result[key] = [];
      result[key].push(item);
      return result;
    }, Object.create(null));
  };
}

// Simple polyfill for Map.groupBy
if (typeof Map.groupBy !== 'function') {
  Map.groupBy = function(array, callbackFn) {
    return array.reduce((result, item) => {
      const key = callbackFn(item);
      if (!result.has(key)) result.set(key, []);
      result.get(key).push(item);
      return result;
    }, new Map());
  };
}