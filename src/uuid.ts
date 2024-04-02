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
  return uuidv5(
    hash(input, { encoding: 'buffer', algorithm: 'sha1' }),
    uuid.getNamespace()
  );
}

uuid.random = uuidv4;
uuid.isValid = validate;

uuid.nil = '00000000-0000-0000-0000-000000000000';
uuid.namespaces = {
  fyi: '5713d04c-59b3-430e-b75f-e43e44754795',
  url: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  dns: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  custom: undefined as string | undefined,
}

uuid.getNamespace = () => { return uuid.namespaces.custom ?? uuid.namespaces.fyi };
uuid.setNamespace = (input: string) => { 
  if (uuid.isValid(input)) {
    uuid.namespaces.custom = input;
  } else {
    throw new Error("Can't use invalid UUID as namespace");
  };
};

