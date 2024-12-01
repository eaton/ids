import hash from 'object-hash';
import sind_fnv1a from '@sindresorhus/fnv1a';

export { hash }

export function md5(input: hash.NotUndefined) {
  return hash(input, { algorithm: 'md5' });
}

export function sha1(input: hash.NotUndefined) {
  return hash(input, { algorithm: 'sha1' });
}

export function sha256(input: hash.NotUndefined) {
  return hash(input, { algorithm: 'sha256' });
}

export function sha512(input: hash.NotUndefined) {
  return hash(input, { algorithm: 'sha512' });
}

export function fnv1a(input: hash.NotUndefined) {
  return sind_fnv1a(hash(input, { algorithm: 'passthrough' })).toString();
}

export function fnv1a64(input: hash.NotUndefined) {
  return sind_fnv1a(hash(input, { algorithm: 'passthrough' }), { size: 64 }).toString();
}

export function fnv1a128(input: hash.NotUndefined) {
  return sind_fnv1a(hash(input, { algorithm: 'passthrough' }), { size: 128 }).toString();
}