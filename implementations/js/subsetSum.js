/* Dynamic Programming - Subset Sum */
const { readFileSync } = require("fs");

let x = [],
  s = -1,
  N = 0,
  A = [],
  B = [],
  m = [];

function logM() {
  const h = [];
  for (let i = 1; i < B; ++i) {
    h.push(i);
  }
  console.log(h.map(i => i.toString().padStart(2, " ")).join(" | "));
  console.log("-".repeat((B - 2) * 5 + 3));

  for (let i = 1; i < N + 1; ++i) {
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
  while (i > 0 && j > 0) {
    if (m[i][j]) {
      console.log(x[i - 1]);
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
}

function initM() {
  m = [];
  for (let i = 0; i < N + 1; ++i) {
    let row = [];
    for (let j = 0; j < B; ++j) {
      row.push(0);
    }
    m.push(row);
  }
}

function Q(i, s) {
  if (s < A || B < s) {
    return false;
  }
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
  /*** Reading input ***/
  const inputData = readFileSync("./knapsack.dat")
    .toString()
    .split("\n");
  const numSets = parseInt(inputData[0]) * 2; // each data set is 2 lines

  for (let i = 1; i < numSets; i += 2) {
    [N, s] = inputData[i].split(" ").map(j => parseInt(j));
    x = inputData[i + 1].split(" ").map(j => parseInt(j));
    x = [...new Set(x).values()];
    N = x.length;
    A = x.filter(i => i < 0).reduce((acc, cur) => acc + cur, 0);
    B = x.filter(i => i > 0).reduce((acc, cur) => acc + cur, 0);
    /*** end Reading input ***/

    if (s < x[0]) {
      console.log(0);
      continue;
    }

    initM();

    let result = Q(N - 1, s);
    if (!result) {
      for (let j = 0; j < N; ++j) {
        if (x[j] > 1 && s % x[j] === 0) {
          m[j + 1][x[j]] = s / x[j];
          result = true;
        }
      }
    }

    const resultVals = m
      .map(row =>
        row
          .map((el, idx) => [el, idx])
          .filter(([el, idx]) => el >= 1)
          .map(([el, idx]) => idx * el)
      )
      .reduce((acc, cur) => acc.concat(cur), []);

    console.log(resultVals[0] || 0);
  }
}

main();
