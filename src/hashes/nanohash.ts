import { Converter } from 'bufferbase';
import { fnv1a } from '../hashes/fnv1a.js';
import { alphabets } from '../alphabets.js';
import type { NotUndefined } from '../index.js';

/**
 * Hashes any value and returns a string using nanoid-style formatting options.
 * 
 * Note: The `size` parameter controls the number of hash bytes used internally,
 * not the final character length. Increasing it *will* increase the length of the
 * hash, but the final hash length ultimately depends on the number of encoding chars
 * available in the alphabet.
 * 
 * The default options (64 bits encoded as url-safe characters) results in 10 to 11
 * character long hashes.
 *
 * @export
 * @param size The number of hash bytes to generate; defaults to 64.
 * @param alphabet The list of valid characters to use when generating the hash.
 */
export function nanohash(input: NotUndefined, size: 32 | 64 | 128 | 256 | 512 | 1024 = 64, alphabet?: string) {
  const converter = new Converter(alphabets.Decimal, alphabet ?? alphabets.UrlSafe);
  return converter.convert(fnv1a(input, size).toString());
}

/**
 * Alias for the 32-bit URL-safe version of `nanohash`; it generates very tiny
 * 5-6 character hashes, but collisions will be much more common.
 */
export function picohash(input: NotUndefined) {
  return nanohash(input, 32);
}