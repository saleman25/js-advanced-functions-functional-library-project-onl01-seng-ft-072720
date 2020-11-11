const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const collectionCopy = (typeof collection === "object") ? Object.values(collection) : collection.slice();

      for (let i = 0; i < collectionCopy.length; i++) {
        callback(collectionCopy[i])
      }
      return collection;
  },

    map: function(collection, callback) {
      const collectionCopy = (typeof collection === "object") ? Object.values(collection) : collection.slice();
      const newArray = []
      for (let i = 0; i < collectionCopy.length; i++) {
        newArray.push(callback(collectionCopy[i]))
      };
      return newArray;
    },

    reduce: function(collection, callback, acc) {
      const collectionCopy = (acc) ? collection.slice() : collection.slice(1);
      let total = (acc) ? acc : collection[0]
      for (let i = 0; i < collectionCopy.length; i++) {
        total = callback(total, collectionCopy[i], collectionCopy)
      };
      return total;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
      collection = Object.values(collection)

      for (let idx = 0; idx < collection.length; idx++)
      if (predicate(collection[idx])) return collection[idx]

      return undefined
    },

    filter: function(collection, predicate){
      let newArray = [];
      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])) {
          newArray.push(collection[i])
        }
      }
      return newArray;
    },

    size: function(collection) {
      const collectionCopy = (typeof collection === "object") ? Object.values(collection) : collection.slice();
      return collectionCopy.length
    },

    first: function(array, n = 0) {
      if (n === 0) {
        return array[0]
      } else {
        let multValues = [];
        for (let i = 0; i < n; i++) {
          multValues.push(array[i])
        }
        return multValues;
      }
    },

    last: function(array, n){
      if (!n) {
        return array.slice(array.length - 1)[0]
      }
      return array.slice(array.length -n)
    },

    compact: function(array){
      let compact = []
      for (let i = 0; i < array.length; i++){
        if (!!array[i]) {
          compact.push(array[i])
        }
      }
      return compact
    },

    sortBy: function(collection, callback) {
      const newArr = [...collection]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },







  }
})()

fi.libraryMethod()
