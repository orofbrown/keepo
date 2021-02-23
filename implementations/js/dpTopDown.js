// TODO: result matrix doesn't work for sums that include x[N-1]
const x = [1, 6, 9];
const s = 12;
const N = x.length;
const A = x.filter(i => i < 0).reduce((a, c) => a + c, 0);
const B = x.filter(i => i > 0).reduce((a, c) => a + c, 0);
const m = [];

function logM() {
  const h = ["s(j)"];
  for (let i = 1; i < B; ++i) {
    h.push(i);
  }
  console.log(h.map(i => i.toString().padStart(2, " ")).join(" | "));
  console.log(" ".repeat(5) + "-".repeat((B - 1) * 5));

  const { stdout } = require("process");
  for (let i = 1; i < N + 1; ++i) {
    stdout.write(`x[${i}] | `);
    let str = m[i]
      .slice(1)
      .map(i => i.toString().padStart(2, " "))
      .join(" | ");
    console.log(str);
  }
}

function traverseM() {
  let i = N;
  let j = s;
  const res = [];
  while (i > 0 && j > 0) {
    if (m[i][j]) {
      res.push(x[i - 1]);
    }
    if (m[i - 1][j]) {
      --i;
    } else if (m[i][j - 1]) {
      --j;
    } else {
      --i;
      --j;
    }
  }
  return res;
}

function initM() {
  for (let i = 0; i < N + 1; ++i) {
    let row = [];
    for (let j = 0; j < B; ++j) {
      row.push(0);
    }
    m.push(row);
  }
}

function checkDivisible() {
  for (let i of x) {
    if (i > 1 && s % i === 0) {
      const mult = s / i;
      const res = [];
      for (let j = 0; j < mult; ++j) {
        res.push(i);
      }
      return res;
    }
  }
}

function Q(i, s) {
  // console.log(`Q(${i}, ${s}): ${x[i]}`);
  if (s < A || B < s) return false;
  if (i === 0) {
    return x[i] === s;
  }

  const result = Q(i - 1, s) || x[i] === s || Q(i - 1, s - x[i]);
  if (result) {
    m[i][s] = 1;
  }
  return result;
}

function main() {
  initM();

  let result = Q(N - 1, s);
  let addends;
  if (result) {
    logM();
    addends = traverseM();
  } else {
    addends = checkDivisible();
  }
  console.log(addends);
  console.log(addends.reduce((acc, cur) => acc + cur));
}

main();
