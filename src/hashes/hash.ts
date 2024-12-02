import hash from 'object-hash';

export type NotUndefined = hash.NotUndefined;

export { hash };

export function stringify(input: hash.NotUndefined) {
  // if (typeof input === 'string') return input;
  return hash(input, { algorithm: 'passthrough' });
}

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

