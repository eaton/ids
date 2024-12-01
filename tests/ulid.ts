import t from 'tap'
import { ulid } from '../src/index.js';

const values = {
  'oLARYZ6-S41TSV4RRF-FQ69G5FAV': { },
  '01JE1N8NMXHVPZMRAK5F2E37FW': { isValid: true },
  'invalid': { isValid: false },
}

t.test('ulid generation', t => {
  t.ok(ulid());
  t.ok(ulid(new Date().getTime()));
  t.ok(ulid(new Date()));
  t.end();
})


t.test('ulid parsing', t => {
  for (const [id, info] of Object.entries(values)) {
    t.match(ulid.inspect(id), info);
  }
  t.end();
});