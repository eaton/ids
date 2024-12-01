import * as lib from 'gtin';
import { Info } from '../types';
import { NotUndefined } from 'object-hash';

/**
 * Convenience alias for the `gtin` function.
 */
export const upc = gtin;

/**
 * Global Trade Item Numbers are used worldwide for identifying and tracking
 * products. While primarily used with barcodes, they can also be used as RFID
 * frequencies. Neat.
 * 
 * A full-length GTIN is 14 digits long; the final digit is a checksum. Short
 * GTIN formats (8, 10, 11, 13 digits, etc), and GTIN-13s are functionally
 * equivalent to North American UPC-A codes.
 * 
 * The top-level `gtin()` function is a convenience alias for `gtin.parse()`.
 *
 * @returns A valid GTIN string, or `undefined`
 */
export function gtin(input: string) {
  return gtin.parse(input);
}

gtin.isValid = (input: string) => {
  try {
    return gtin.parse(input) !== undefined;
  } catch {
    return false;
  }
}

gtin.parse = (input: NotUndefined) => { 
  const trimmed = input?.toString().trim().replaceAll('-', '');
  if (!trimmed) return undefined;

  try {
    if (lib.isGTIN(trimmed)) {
      return trimmed;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

gtin.format = gtin.parse
gtin.minified = (input: string) => {
  const parsed = gtin.parse(input);
  return parsed ? lib.minify(parsed) : undefined;
}

gtin.inspect = (input: string) => {
  const parsed = gtin.parse(input);
  const out: Info = {
    input: input,
    isValid: !!parsed,
  }

  if (parsed) {
    out.isChecked = gtin.isValid(parsed);
    out.type = lib.getFormat(parsed);
    out.formatted = gtin.format(parsed);
    out.minified = lib.minify(parsed);
  }
  return out;
}