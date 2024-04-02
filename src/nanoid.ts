import { nanoid as nanoFunc, customAlphabet, urlAlphabet } from 'nanoid';
import { Converter, Chars } from 'bufferbase';
import hash from 'hash-it';

export const alphabets = {
  Upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Lower: 'abcdefghijklmnopqrstuvwxyz',
  UrlSafe: urlAlphabet,
  NoLookalikes: '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz',
  DNA: 'GATC',
  Binary: '01',
  Octal: '01234567',
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


// TODO: Evaluate potential pros and cons with the object-hash vs hash-it libraries.
// We're not using the level of control we get with object-hash, but its explicit
// support for a variety of algorithms is comforting as opposed to hash-it's loosey
// goosey "you get a number!" approach.

/**
 * Hashes any value and returns a string using the same formatting options as nanoid.
 * 
 * Note: Hashing generates the same amount of data regardless of the input. Reducing
 * the number of characters in the alphabet will increase the size of the hash output.
 *
 * @export
 * @param alphabet The list of valid characters to use when generating the hash.
 */
export function nanohash(input: unknown, alphabet?: string) {
  const converter = new Converter(alphabets.Decimal, alphabet ?? alphabets.UrlSafe);
  return converter.convert(hash(input).toString())
}