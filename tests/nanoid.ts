import t from 'tap'
import { nanoid, nanohash, alphabets } from '../src/index.js';

t.test('size control', t => {
  t.equal(nanoid(5).length, 5);
  t.equal(nanoid(10).length, 10);
  t.equal(nanoid(20).length, 20);
  t.end();
})

t.test('nano hash', t => {
  const url = 'https://www.example.com/some-long-url/with.html';

  t.equal(nanohash(url), 'xwrLAat');
  t.equal(nanohash(url, alphabets.DNA), 'AACCTACCGTTTATAGGCCCC');
  t.end();
})
