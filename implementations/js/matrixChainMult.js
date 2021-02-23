// Matrix Chain Multiplication with Dynamic Programming
// Finding the most efficient way to multiply a given sequences of matrices
// To find the cost of one set of parenthisized matrices, do:
//    p*q*r + p*r*s

function mcm(dims, i, j) {
  // base case - one matrix
  if (j <= i + 1) {
    return 0;
  }

  let min = Infinity;

  // i = 0, j = 3, k = 1
  // mcm(dims, 0, 1)
  //  => 1 <= 1 ? true
  // mcm (dims, 1, 3)
  //  => 3 <= 2 ? false
  //  mcm(dims, 1, 2)
  //  => 2 <= 2 ? true
  //  mcm(dims, 2, 3)
  //  => 3 <= 3 ? true
  for (let k = i + 1; k < j; k++) {
    let cost = mcm(dims, i, k);
    cost += mcm(dims, k, j);
    cost += dims[i] * dims[k] * dims[j];

    if (cost < min) {
      min = cost;
    }
  }

  return min;
}

function main() {
  const dims = [10, 30, 5, 60];
  const n = dims.length;

  const cost = mcm(dims, 0, n - 1);

  console.log(`Minimum cost is ${cost}`);
}

main();
