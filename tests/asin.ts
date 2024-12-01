import t from 'tap'
import { asin } from '../src/index.js';

const values = {
  '0262046083': { isValid: true, isISBN: true },
  'B0D47SKF19': { isValid: true, isISBN: false },
  'B0DN59B81G': { isValid: true, isISBN: false },
  '978-0262046084': { isValid: false },
  'https://www.amazon.com/dp/0262046083': {
    isValid: true,
    formatted: '0262046083',
    isbn10h: '0-262-04608-3'
  },
  'https://www.amazon.com/Accomplishment-Without-Burnout/dp/0593544854': { isValid: true, formatted: '0593544854' },
  'https://www.amazon.com/Art-Making-Arcane-Gaming/dp/B0D47SKF19': { isValid: true, formatted: 'B0D47SKF19' },
  'https://www.amazon.com/gp/video/detail/B0DN59B81G/ref=atv_hm_liv_lr4f4b5f_c_tas3lp_1_1': {
    isValid: true,
    formatted: 'B0DN59B81G',
    url: 'https://www.amazon.com/dp/B0DN59B81G'
  },
}

t.test('validation', t => {
  for (const [id, info] of Object.entries(values)) {
    t.match(asin.inspect(id), info);
  }
  t.end();
});
