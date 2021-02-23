/* Query Counter + extra A/C
 * Description:
 *   Count the occurrence of each string in the list in the most efficient way possible
 *   Once they're all counted, find the top N most common/popular strings
 */

function getTopN(n, arr) {
  // Find top N
  const end = arr.length - 1;
  let topNResults = end - n;

  const results = [];
  for (let i = arr.length - 1; i > topNResults; --i) {
    results.push([i, arr[i][0]]);
  }
  return results;
}

function findMostPopular(arr) {
  /* Loop through array and put each string into the map
   * key = string, value = count
   * `arr` = Array<string>
   * Time - O(n)
   */
  const dict = new Map();
  arr.forEach(x => {
    if (dict.has(x)) {
      let count = dict.get(x) + 1;
      dict.set(x, count);
    } else {
      dict.set(x, 1);
    }
  });

  /* Flip the dictionary into an array with counts as indexes
   * map:  ['js' => 3]
   * arr2: [0 (empty)
   *        1 (empty)
   *        2 (empty)
   *        ['js']
   *        ..,
   *        n-1 (empty)
   *        n]
   * This avoids having to do a sort later
   * Time - O(n)
   */
  const arr2 = [];
  [...dict.entries()].forEach(([k, v]) => {
    const entry = arr2[v];
    if (!entry) {
      arr2[v] = [k];
    } else {
      entry.push(k);
      arr2[v] = entry;
    }
  });

  // Find top N results. Can't filter out empty slots bc
  // that would change the indexes of each item, which server as counters
  return getTopN(1, arr2);
}

function main() {
  const res = findMostPopular(["js", "python", "java", "python", "js", "js"]);
  console.log(res);
}

main();
