import hash from 'object-hash';

export type NotUndefined = hash.NotUndefined;

export { hash };

/**
 * Creates a string representation of any non-undefined object or value,
 * suitable for hashing.
 * 
 * This function is just a light wrapper around the `object-hash` library's
 * hash function; it leverages object-hash's property sorting, sanitizing,
 * and so on to create a consistent string representation but does NOT
 * actually hash the value; this means we can pass it to any of other
 * hashing algorithm and have a consistent underlying stringification behavior.
 */
export function stringify(input: hash.NotUndefined, skipStrings = true) {
  if (skipStrings && typeof input === 'string') return input;
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

