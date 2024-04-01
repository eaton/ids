import test from 'ava';
import { uuid } from '../src/index.js';

test('validation', t => {
  t.assert(uuid.isValid(uuid()));
  t.assert(uuid.isValid(uuid({ id: 1234, name: 'random object '})));
  t.is(uuid.isValid('very much invalid'), false);
})

test('hashing', t => {
  const obj1 = { id: 123, name: 'bob' };
  const obj2 = { id: 123, name: 'dave' };

  t.is(uuid(obj1), uuid(obj1));
  t.not(uuid(obj1), uuid(obj2));

  t.is(uuid('some-string-value'), uuid('some-string-value'));
  t.not(uuid('some-string-value'), uuid('another-string-value'));
});

test('namespaces', t => {
  const newNamespace = uuid();
  t.notThrows(() => uuid.setNamespace(newNamespace));
  t.throws(() => uuid.setNamespace('this is very much not a proper uuid'));

  const oldId = uuid('data-with-namespace');
  uuid.setNamespace(uuid());
  const newId = uuid('data-with-namespace');
  t.not(oldId, newId);
});

test('null uuids', t => {
  // We return a special 'nil' UUID if null is passed in.
  t.is(uuid(null), uuid.nil);
  
  // Setting uuid.nil to an empty string turns this behavior off; random UUIDs
  // for null values.
  uuid.nil = '';
  t.not(uuid(null), uuid.nil);
})