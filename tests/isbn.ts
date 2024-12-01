import t from 'tap'
import { isbn } from '../src/index.js';

const values = { 'truth': '978-0262046084' };

t.test('validation', t => {
  t.ok(isbn.isValid(values.truth));
  t.end();
})

