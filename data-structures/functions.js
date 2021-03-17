const Functions = (function () {
  const exists = (val) => val !== null && val !== undefined;

  const existsOn = (obj, prop) => obj[prop] !== null && obj[prop] !== undefined;

  const isPrimitive = (val) => typeof val != "object";

  function* range() {
    const startIsNull = () => arguments.length === 1;
    const start = startIsNull() ? 0 : arguments[0];
    const stop = startIsNull() ? arguments[0] : arguments[1];
    const step = arguments[2] || 1;

    for (let i = start; i < stop; i += step) {
      yield i;
    }
  }

  function zip(array1, array2) {
    const shortestLength = Math.min(array1.length, array2.length);
    return [...range(shortestLength)].map((i) => [array1[i], array2[i]]);
  }

  return {
    exists,
    existsOn,
    isPrimitive,
    range,
    zip,
  };
})();

module.exports = Functions;
