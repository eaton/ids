import { v4 as uuidv4, v5 as uuidv5, validate } from 'uuid';
import hash from 'object-hash';
import { NotUndefined } from 'object-hash';
/**
 * Given input, hashes the input and generates a UUID string from the
 * hash value. If no input is given, a random UUID is returned.
 */
export function uuid(input?: unknown): string {
  if (input === null && uuid.nil) return uuid.nil;
  if (input !== undefined) return uuid.hash(input);
  return uuid.random()
}

uuid.hash = (input: NotUndefined) => {
  const hashOutput = hash(input, { encoding: 'buffer' });
  return uuidv5(hashOutput, uuid.namespace);
}
uuid.random = uuidv4;
uuid.isValid = validate;
uuid.nil = '00000000-0000-0000-0000-000000000000';
uuid.namespace = '5713d04c-59b3-430e-b75f-e43e44754795';
uuid.getNamespace = () => { return uuid.namespace };
uuid.setNamespace = (input: string) => { 
  if (uuid.isValid(input)) {
    uuid.namespace = input;
  } else {
    throw new Error("Can't use invalid UUID as namespace");
  };
};

