import { nanoid as nanoFunc, customAlphabet, urlAlphabet } from 'nanoid';
import { BufferEncoder, Chars } from 'bufferbase';
import hash, { NotUndefined} from 'object-hash';

export const alphabets = {
  Upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Lower: 'abcdefghijklmnopqrstuvwxyz',
  UrlSafe: urlAlphabet,
  NoLookalikes: '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz',
  Binary: '01',
  GATC: 'GATC',
  ...Chars,
};

/**
 * Generates a random ID string with a low probability of collision
 *
 * @export
 * @param size The length of the desired ID, in characters
 * @param alphabet The list of valid characters to use when generating the ID. Smaller alphabets increase the probability of collision.
 */
export function nanoid(size?: number, alphabet?: string) {
  if (alphabet === undefined) return nanoFunc(size);
  return customAlphabet(alphabet)(size);
}

/**
 * Hashes any value and returns a string using the same formatting options as nanoid.
 * 
 * Note: Hashing generates the same amount of data regardless of the input. Using the
 * default nanoid alphabet, it producdes 27-character nanohashes. Reducing the size
 * will truncate the hash, increasing the chance of collision. Reducing the numbr of 
 * characters in the alphabet will increase the size of the hash output, or (if the
 * size is hard-coded) increase the chance of collision.
 *
 * @export
 * @param size The length of the desired hash, in characters.
 * @param alphabet The list of valid characters to use when generating the hash.
 */
export function nanohash(input: NotUndefined, size?: number, alphabet?: string) {
  const encoder = new BufferEncoder(alphabet ?? alphabets.UrlSafe);
  const buffer = hash(input, { encoding: 'buffer' });
  return encoder.encode(buffer).slice(0, size);
}