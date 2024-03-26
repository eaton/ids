import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import hash from 'object-hash';

export const UuidNamespace = '5713d04c-59b3-430e-b75f-e43e44754795';

/**
 * Given input, hashes the input and generates a UUID string from the
 * hash value. If no input is given, a random UUID is returned.
 */
export function uuid(input?: unknown): string {
  if (input) {
    const hashOutput = hash(input, { encoding: 'buffer' });
    return uuidv5(hashOutput, UuidNamespace);
  }

  return uuidv4();
}
