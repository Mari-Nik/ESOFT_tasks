function customDeepCopy(obj, copiedRef = new WeakMap()) {
    if (copiedRef.has(obj)) {
        return copiedRef.get(obj);
    }
    
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
  
    if (Array.isArray(obj)) {
        const copy = [];
        copiedRef.set(obj, copy);
        obj.forEach((item, idx) => copy[idx] = customDeepCopy(item, copiedRef));
  
        return copy;
    } 
    
    if (obj instanceof Map) {
        const copy = new Map();
        copiedRef.set(obj, copy);
        for (let key of obj.keys()) {
            copy.set(customDeepCopy(key, copiedRef), customDeepCopy(obj.get(key), copiedRef));
        }
  
        return copy;
    } 
    
    if (obj instanceof Date) {
        return new Date(obj);
    }
  
    if (obj instanceof Set) {
        const copy = new Set();
        copiedRef.set(obj, copy);
        for (const item of obj) {
            copy.add(customDeepCopy(item, copiedRef));
        }
  
        return copy;
    } 
    
    if (typeof obj === "object") {
        const copy = Object.create(Object.getPrototypeOf(obj));
  
        copiedRef.set(obj, copy);
  
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = customDeepCopy(obj[attr], copiedRef);
            }
        }
  
        return copy;
    }     
  }
  
  const originalObject = {
    number: 11,
    array: [
        {
            a: {
                b: {
                    c: 13
                }
            }
        },
        "String for copy",
        new Set([1, 2, 3]),
    ],
    fn: function() {console.log("Hello World!");},
    sym: Symbol(),
    date: new Date(new Date().setFullYear(2007)),
    set: new Set([1, 2, [3,4]]),
    map: new Map([
        ["1", "one"],
        [2, "two"],
        [3, {3: "three"}],
        [4, function() {console.log("Hello World!");}],
      ]),
  };
  
  
  originalObject["self"] = originalObject;
  originalObject.array.push(originalObject.array);
  
  let copyObject = customDeepCopy(originalObject);
  
  console.log("Original: ", originalObject);
  console.log("Clone: ", copyObject);
  