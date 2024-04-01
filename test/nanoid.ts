import test from 'ava';
import { nanoid, urlid } from '../src/index.js';

test('size control', t => {
  t.is(nanoid(5).length, 5);
  t.is(nanoid(10).length, 10);
  t.is(nanoid(20).length, 20);
})

test('alphabet control', t => {
  t.is(urlid(10).length, 10);
  t.is(nanoid(10, '0'), '0000000000');
})
