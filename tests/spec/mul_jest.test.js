const mul = require('../../lambda/jest_mul_test_handler');

test('multiplies 2 * 3 to equal 6', () => {
  expect(mul(2, 3)).toBe(6);
});
