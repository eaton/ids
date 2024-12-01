import t from 'tap'
import { gtin } from '../src/index.js';

const values = {
  '2370009316708': { isValid: true, isChecked: true },
  '1234': { isValid: false },
};

t.test('validation', t => {
  for (const [id, info] of Object.entries(values)) {
    t.match(gtin.inspect(id), info);
  }
  t.end();
})
