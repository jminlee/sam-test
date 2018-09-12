const sum = require('../lambda/test_handler');


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});