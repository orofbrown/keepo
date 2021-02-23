const logging = require("dpLogMatrix");

const x = [1, 6, 9];
const s = 15;
const N = x.length;
const A = x.filter(i => i < 0).reduce((a, c) => a + c, 0);
const B = x.filter(i => i > 0).reduce((a, c) => a + c, 0);
const m = [];

function initM() {
  for (let i = 0; i <= N; ++i) {
    let row = [];
    for (let j = 0; j < B; ++j) {
      row.push(0);
    }
    m.push(row);
  }

  // for (let j = 1; j <= s; ++j) {
  //   m[0][j] = 0;
  // }
  for (let i = 0; i <= N; ++i) {
    m[i][0] = 1;
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

function Q() {
  // for ith item
  for (let i = 1; i <= N; ++i) {
    // consider all sums from 1 to s
    for (let j = 1; j <= s; ++j) {
      // don't include ith element if j - x[i-1] is negative
      if (x[i - 1] > j) {
        m[i][j] = m[i - 1][j];
      } else {
        const jMinusArrayElement = j - x[i - 1];
        m[i][j] = m[i - 1][j] || m[i - 1][jMinusArrayElement];
        console.log(i - 1, j, jMinusArrayElement);
      }
    }
  }

  return m[N][s];
}

function main() {
  initM();

  let result = Q();
  console.log(Boolean(result));

  logM();
}

main();
