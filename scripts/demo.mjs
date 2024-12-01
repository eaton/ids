import * as utils from '../dist/index.mjs';

const example = {
  name: 'John Doe',
  address: '123 North Avenue',
  age: 25
};

console.log('-- ID Generators --');
console.log('NanoID\t\t', utils.nanoid());
console.log('NanoID 10-char\t', utils.nanoid(10));
console.log('NanoID Base64\t', utils.nanoid(undefined, utils.alphabets.Base64_URL_SAFE));
console.log('ULID\t\t', utils.ulid());
console.log('UUIDv1\t\t', utils.uuid.v1());
console.log('UUIDv4\t\t', utils.uuid.v4());
console.log('UUIDv6\t\t', utils.uuid.v6());
console.log('UUIDv7\t\t', utils.uuid.v7());
console.log('UUIDv7 1/1/2000\t', utils.uuid.v7({ msecs: new Date(2000, 0, 1).getTime() }));

console.log('\n-- Hash Generators --');
console.log('fnv1a\t\t', utils.fnv1a(example));
console.log('fnv1a64\t\t', utils.fnv1a64(example));
console.log('Nanohash\t', utils.nanohash(example));
console.log('Picohash\t', utils.picohash(example));
console.log('Nanohash DNA\t', utils.nanohash(example, undefined, utils.alphabets.DNA));
console.log('UUIDv5\t\t', utils.uuid.hash(example, utils.uuid.namespaces.fyi));
console.log('MD5\t\t', utils.md5(example));
console.log('SHA1\t\t', utils.sha1(example));
console.log('SHA256\t\t', utils.sha256(example));

console.log('\n-- UUID Inspection --');
console.log(utils.uuid.inspect(utils.uuid.v7({ msecs: new Date(2000, 0, 1).getTime() })));

console.log('\n-- ISBN Inspection --');
console.log(utils.isbn.inspect('9780262046084'));