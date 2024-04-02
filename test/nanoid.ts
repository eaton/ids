import test from 'ava';
import { nanoid, nanohash } from '../src/index.js';

test('size control', t => {
  t.is(nanoid(5).length, 5);
  t.is(nanoid(10).length, 10);
  t.is(nanoid(20).length, 20);
})

test('nano hash', t => {
  const url = 'https://www.example.com/some-long-url/with.html';
  const hash = nanohash(url);
  const shortHash = nanohash(url, 10);

  t.not(hash, shortHash);
})

test('long hash', t => {
  const url = 'https://www.example.com/some-long-url/with.html';
  const hash = nanohash(url);
  console.log(hash);
  t.assert(hash.length > 20);
})