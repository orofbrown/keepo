describe('Tuple', function () {
  const Tuple = require('../containers/tuple');

  beforeAll(() => {
    var tuple = new Tuple([1, 2, 3, 4, 5]);
    [...tuple];
  });
});
