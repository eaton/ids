import t from 'tap'
import { isbn } from '../src/index.js';

const values = {
  'B004GHN25S': { isValid: false },
  '978-0262046084': { isValid: true },
  '978-1-419-70852-7': { isValid: true, minified: '141970852X' },
  '141970852X': { isValid: true, styles: { isbn13h: '978-1-4197-0852-7' } },
  '2370009147227': { isValid: false },
  '9798985942125': { isValid: true, minified: '9798985942125' }
}

t.test('validation', t => {
  for (const [id, info] of Object.entries(values)) {
    t.match(isbn.inspect(id), info);
  }
  t.end();
});
