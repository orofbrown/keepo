describe('Hashable Types:', function () {
  const HashTable = require('../containers/hashTable');
  const HashMap = require('../containers/hashMap');
  const HashSet = require('../containers/hashSet');
  const { zip } = require('../functions');

  const array = ['a', 'foo', 13, '13', true, 98, 'a'];

  describe('HashTable', () => {
    this.hashTable;

    beforeEach(() => {
      this.hashTable = new HashTable(array);
    });

    it('should have collision resolution via separate chaining + dynamic array (there should only be one of "a")', () => {
      expect(this.hashTable.size).toBe(array.length - 1);
      const indexOfA = [...this.hashTable].indexOf('a');
      expect(indexOfA).toBeGreaterThan(-1);
      expect([...this.hashTable].indexOf('a', indexOfA + 1)).toBe(-1);
    });

    it('should check if it has a given element', () => {
      array.forEach((i) => expect(this.hashTable.has(i)).toBeTrue());
    });

    it('should return the size of the HashTable', () => {
      expect(this.hashTable.size).toBe(6);
    });

    it('should be iterable', () => {
      const expected = [...this.hashTable].sort();
      const actual = array.slice(0, -1).sort();
      expect(expected).toEqual(actual);
    });

    it('should be able to call the constructor without args', () => {
      const ht = new HashTable();
      expect(ht).toBeDefined();
      expect(ht.size).toBe(0);
    });
  });

  describe('HashMap', function () {
    const valueArray = [5, 'bar', 'blah', { msg: 'flurb' }, 'one hundred', 2];
    const pairedArray = zip(array, valueArray);

    beforeEach(() => {
      this.hashMap = new HashMap(pairedArray);
    });

    it('should implement item retrieval', () => {
      pairedArray.forEach(([k, v]) => expect(this.hashMap.get(k)).toEqual(v));
    });

    it('should implement item removal', () => {
      let count = 0;
      pairedArray.forEach(([k, v]) => {
        this.hashMap.remove(k);
        ++count;
        expect(this.hashMap.size).toBe(pairedArray.length - count);
      });
      expect(this.hashMap.size).toBe(0);
    });

    it('should implement item insertion', () => {
      this.hashMap = new HashMap();
      expect(this.hashMap.size).toBe(0);

      this.hashMap.set('a', 5);
      this.hashMap.set('foo', 'bar');
      this.hashMap.set(13, 'blah');
      this.hashMap.set('13', 'flurb');
      this.hashMap.set(98, 'one hundred');
      this.hashMap.set(true, 2);

      expect(this.hashMap.size).toBe(6);
    });

    it('should check if it has a given element', () => {
      array.forEach((i) => expect(this.hashMap.has(i)).toBeTrue());
    });

    it('should return the size of the HashTable', () => {
      expect(this.hashMap.size).toBe(6);
    });

    it('should be iterable', () => {
      const expected = [...this.hashMap].sort();
      const actual = [...pairedArray].sort();
      expect(expected).toEqual(actual);
    });

    it('should be able to call the constructor without args', () => {
      const map = new HashMap();
      expect(map).toBeDefined();
      expect(map.size).toBe(0);
    });

    it('should have collision resolution via separate chaining + dynamic array', () => {
      expect(this.hashMap.size).toBe(6);
      expect(this.hashMap.get('a')).toBe(5);

      this.hashMap.set('a', 5);
      expect(this.hashMap.size).toBe(6);

      this.hashMap.set('a', '12');
      expect(this.hashMap.size).toBe(6);
      expect(this.hashMap.get('a')).toBe('12');
    });
  });

  describe('HashSet', function () {
    it('should ', () => {});
  });
});
