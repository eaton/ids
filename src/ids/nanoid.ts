import { nanoid as nanoFunc, customAlphabet } from 'nanoid';

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
