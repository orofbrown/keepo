function countAndSay(n) {
  let prev = "1";
  let next = "";

  for (let i = 0; i < n; ++i) {
    let count = 1;
    let currentLetter = prev[0];
    for (let j = 1; j < prev.length; ++j) {
      let nextLetter = prev[j];
      if (currentLetter == nextLetter) {
        ++count;
      } else {
        next += `${count}${currentLetter}`;
        count = 1;
      }
    }

    next += `${count}${currentLetter}`;
    prev = next;
    next = "";
  }

  return prev;
}

console.log(countAndSay(0));
console.log(countAndSay(1));
console.log(countAndSay());
console.log(countAndSay(3));
console.log(countAndSay(4));
console.log(countAndSay(5));
console.log(countAndSay(6));
