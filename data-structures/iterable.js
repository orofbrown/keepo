function Iterator(iterObj, size) {
  let _done = false;
  let _iterObj = iterObj;
  let _nextIndex = 0;
  let _size = size;

  this.next = () => {
    return { value: _iterObj[_nextIndex++], done: _nextIndex >= _size };
  };
}

function Iterable(enumerable, size) {
  const _enumerable = enumerable;
  const _size = size;

  return {
    [Symbol.iterator]: () => new Iterator(_enumerable, _size),
    generator: function* () {
      yield* _enumerable;
    },
  };
}

if (require.main == module) {
  const arr = [1, 2, 3, 4, 5];

  let iter = new Iterator(arr, arr.length);
  let done = false;
  while (!done) {
    const i = iter.next();
    done = i.done;
    console.log(i);
  }

  console.log();

  const myIter = Iterable();
  console.log(myIter);
  console.log(myIter[Symbol.iterator]);
  console.log(myIter[Symbol.iterator]());
  console.log([...myIter]);

  for (let i of myIter) {
    console.log(i);
  }

  console.log();

  var gen = myIter.generator();
  console.log(gen);
  console.log([...gen]);
  console.log(gen.next());

  gen = myIter.generator();
  for (let i of gen) {
    console.log(i);
  }
}

module.exports = Iterable;
