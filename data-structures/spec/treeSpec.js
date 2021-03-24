const { zip } = require('../functions');

describe('Tree:', function () {
  /*
   * 2-tree (binary) structure without rebalancing (in order of insertion), using below test data:
   *                    81
   *                /        \
   *              /            \
   *            85              68
   *          /    \           /   \
   *        97     83        57    28
   *      /   \   /   \     /
   *    86    82 75   60  44
   */

  const testData = [81, 85, 68, 97, 83, 57, 28, 86, 82, 75, 60, 44];
  const Tree = require('../containers/unorderedTree');
  const HelperModule = require('../containers/treeHelpers');
  this.tree = null;

  beforeAll(() => {
    spyOn(HelperModule, 'depthFirstSearch').and.callThrough();
    spyOn(HelperModule, 'depthFirstTraversal').and.callThrough();
  });

  beforeEach(() => {
    this.tree = new Tree(2, [...testData]);
    expect(this.tree.size).toBe(12);
  });

  describe('Search:', () => {
    beforeEach(() => {
      HelperModule.depthFirstSearch.calls.reset();
    });

    function assertAndReset(
      searchResult,
      expectedIndex,
      expectedCallCount,
      searchedItem,
    ) {
      expect(searchResult).toBe(expectedIndex);
      expect(HelperModule.depthFirstSearch.calls.count()).toBe(
        expectedCallCount,
        `Failed for ${searchedItem} at index ${expectedIndex}`,
      );
      HelperModule.depthFirstSearch.calls.reset();
    }

    it('should implement a Breadth-first Search', () => {
      expect(this.tree.search(44, 'bfs')).toBe(11);
      expect(this.tree.search(60, 'bfs')).toBe(10);
      expect(this.tree.search(86, 'bfs')).toBe(7);
      expect(this.tree.search(81, 'bfs')).toBe(0);
    });

    it('should implement a pre-order Depth-first Search', () => {
      const callCounts = [1, 2, 9, 3, 6, 10, 12, 4, 5, 7, 8, 11];
      const paired = zip(testData, callCounts);
      paired.forEach(([searchValue, expectedCount], index) => {
        const result = this.tree.search(searchValue);
        assertAndReset(result, index, expectedCount, searchValue);
      });
    });

    it('should implement a reverse pre-order Depth-first Search', () => {
      const callCounts = [1, 6, 2, 10, 7, 4, 3, 12, 11, 9, 8, 5];
      const paired = zip(testData, callCounts);
      paired.forEach(([searchValue, expectedCount], index) => {
        const result = this.tree.search(searchValue, 'rightLeft');
        assertAndReset(result, index, expectedCount, searchValue);
      });
    });

    it('should guard for invalid search types', () => {
      expect(() => this.tree.search(44, 'dfs')).toThrowError();
    });
  });

  describe('Traversal:', () => {
    beforeEach(() => {
      HelperModule.depthFirstTraversal.calls.reset();
    });

    function assertAndReset(traversalResult, expectedList, expectedCallCount) {
      expect(traversalResult).toEqual(expectedList);
      expect(HelperModule.depthFirstTraversal.calls.count()).toBe(
        testData.length,
      );
      HelperModule.depthFirstTraversal.calls.reset();
    }

    it('should implement a Breadth-first Traversal', () => {
      expect(this.tree.traverse('bfs')).toEqual(testData);
    });

    it('should implement a pre-order Depth-first traversal', () => {
      assertAndReset(
        this.tree.traverse('pre'),
        [81, 85, 97, 86, 82, 83, 75, 60, 68, 57, 44, 28],
        12,
      );
    });

    it('should implement an in-order Depth-first traversal', () => {
      assertAndReset(
        this.tree.traverse(),
        [86, 97, 82, 85, 75, 83, 60, 81, 44, 57, 68, 28],
        12,
      );
    });

    it('should implement a post-order Depth-first traversal', () => {
      assertAndReset(
        this.tree.traverse('post'),
        [86, 82, 97, 75, 60, 83, 85, 44, 57, 28, 68, 81],
        12,
      );
    });

    it('should guard for invalid traversal types', () => {
      expect(() => this.tree.search(44, 'dfs')).toThrowError();
    });
  });

  describe('Other operations:', () => {
    it('should implement Iterable', () => {
      expect([...this.tree]).toEqual(testData);
    });

    it('should implement item insertion', () => {
      this.tree = new Tree();
      expect(this.tree.size).toBe(0);
      testData.forEach((i) => this.tree.add(i));
      expect(this.tree.size).toBe(12);
      expect(this.tree.search(44)).toBe(11);
    });

    it('should implement item removal', () => {
      expect(this.tree.size).toBe(12);
      testData.forEach((i) => this.tree.remove(i));
      expect(this.tree.size).toBe(0);
    });
  });
});
