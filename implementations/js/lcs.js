/* Dynamic Programming - Longest Common String */
const { stdout } = require("process");

const S = "ABAZDC";
const T = "BACBAD";

function findLCS() {
  const n = S.length;
  const m = T.length;
  const dp = [];

  for (let i = 0; i <= n; ++i) {
    let row = [];
    for (let j = 0; j <= m; ++j) {
      row.push(0);
    }
    dp.push(new Array(m + 1));
  }

  for (let i = 0; i <= n; ++i) {
    for (let j = 0; j <= m; ++j) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (S[i - 1] === T[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let len = dp[n][m];
  let result = "";
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (dp[i][j] === dp[i - 1][j]) {
      --i;
      // console.log(S[i], T[j]);
    } else if (dp[i][j] === dp[i][j + 1]) {
      ++j;
      // console.log(S[i], T[j]);
    } else {
      --i;
      --j;
      result = S[i] + result;
    }
  }

  return [len, result];
}

const res = findLCS();
console.log(res);
