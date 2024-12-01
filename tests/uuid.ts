import t from 'tap'
import { uuid } from '../src/index.js';

t.test('validation', t => {
  t.equal(uuid.isValid(uuid()), true);
  t.equal(uuid.isValid(uuid({ id: 1234, name: 'random object '})), true);
  t.equal(uuid.isValid('very much invalid'), false);
  t.end();
})

t.test('hashing', t => {
  const obj1 = { id: 123, name: 'bob' };
  const obj2 = { id: 123, name: 'dave' };

  t.equal(uuid(obj1), uuid(obj1));
  t.not(uuid(obj1), uuid(obj2));

  t.equal(uuid('some-string-value'), uuid('some-string-value'));
  t.not(uuid('some-string-value'), uuid('another-string-value'));
  t.end();
});

t.test('namespaces', t => {
  const newNamespace = uuid();
  t.ok(() => uuid.setNamespace(newNamespace));
  t.throws(() => uuid.setNamespace('this is very much not a proper uuid'));

  const oldId = uuid('data-with-namespace');
  uuid.setNamespace(uuid());
  const newId = uuid('data-with-namespace');
  t.not(oldId, newId);
  t.end();
});

t.test('null uuids', t => {
  // We return a special 'nil' UUID if null is passed in.
  t.equal(uuid(null), uuid.nil);
  t.end();
});

t.test('timestamps', t => {
  const date = new Date(1977, 7, 16, 2, 30);
  const v7 = uuid.sortable(date);
  
  t.equal(uuid.getTimestamp(v7)!.valueOf(), date.valueOf());
  t.equal(uuid.getTimestamp(uuid.random()), undefined);
  t.end();
});
