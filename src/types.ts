import { NotUndefined } from 'object-hash';

/**
 * Basic ID generation function; without input, it should emit the appropriate
 * ID type. Optional parameters may be supported but defaults should be used if
 * none are given.
 */
export interface Generator<T extends string | number = string | number> {
  generate: () => T
};

/**
 * Basic hashing function; by definition input is required, or it would be a
 * generator. As with generators, optional paramaters may be supported but
 * sensible defaults should be supplied.
 */
export interface Hasher<T extends string | number = string | number> {
  hash: (input: NotUndefined) => T
};

/**
 * A standard mix of helper functions to parse, validate, format, and inspect
 * both IDs and hash values. Generally speaking, `parse` should be lenient in
 * what it accepts while `format` and `isValid` can be pedantic. `inspect`
 * should accept lenient things that are reasonably likely to be valid but
 * should explicitly return  
 */
export interface Helper<T extends string | number = string | number> {
  parse: (input: NotUndefined) => T | undefined;
  isValid: (input: T) => boolean;
  format: (input: string, style?: string) => string;
  inspect: (input: T) => Info<T>;
};

/**
 * Description placeholder
 */
export type Info<T extends string | number = string | number> = Record<string, unknown> & {
  input: T,
  isValid: boolean,
  formatted?: string,
}
