import hash from 'object-hash';

export { hash }

export function md5(input: hash.NotUndefined) {
  return hash(input, { algorithm: 'sha1' });
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
