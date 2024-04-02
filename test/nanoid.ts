import test from 'ava';
import { nanoid, nanohash, alphabets } from '../src/index.js';

test('size control', t => {
  t.is(nanoid(5).length, 5);
  t.is(nanoid(10).length, 10);
  t.is(nanoid(20).length, 20);
})

test('nano hash', t => {
  const url = 'https://www.example.com/some-long-url/with.html';

  t.is(nanohash(url), 'xwrLAat');
  t.is(nanohash(url, alphabets.DNA), 'AACCTACCGTTTATAGGCCCC');
})
