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
