import * as lib from 'gtin';
import { Info } from '../types';
import { NotUndefined } from 'object-hash';

export const upc = gtin;

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