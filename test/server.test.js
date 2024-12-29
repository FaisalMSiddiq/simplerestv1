import test from 'node:test';
import assert from 'node:assert';
import { validateTimezone } from '../src/validators.js';

test('validateTimezone', async (t) => {
  await t.test('should return true for valid timezone', () => {
    assert.strictEqual(validateTimezone('America/New_York'), true);
    assert.strictEqual(validateTimezone('Europe/London'), true);
    assert.strictEqual(validateTimezone('Asia/Tokyo'), true);
  });

  await t.test('should return false for invalid timezone', () => {
    assert.strictEqual(validateTimezone('Invalid/Timezone'), false);
    assert.strictEqual(validateTimezone(''), false);
    assert.strictEqual(validateTimezone(null), false);
    assert.strictEqual(validateTimezone(undefined), false);
  });
});