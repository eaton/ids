import { ulid as lib, decodeTime, isValid, fixULIDBase32 } from 'ulidx';
import { Info } from '../types';

export function ulid(input?: number | Date) {
  if (input === undefined) return lib();
  if (typeof input === 'number') return lib(input);
  return lib(input.getTime());
}

ulid.parse = (input: string) => {
  return fixULIDBase32(input);
}
ulid.isValid = (input: string) => isValid(ulid.parse(input));
ulid.format = ulid.parse;
ulid.minify = ulid.parse;
ulid.getTimestamp = (input: string) => {
  const parsed = ulid.parse(input);
  return parsed ? decodeTime(parsed) : undefined;
}
ulid.getDate = (input: string) => {
  const time = ulid.getTimestamp(input);
  return time ? new Date(time) : undefined;
}

ulid.inspect = (input: string) => {
  const parsed = ulid.parse(input);
  const out: Info = {
    input,
    isValid: isValid(parsed),
  };
  if (out.isValid) {
    out.date = ulid.getDate(parsed);
    out.timestamp = ulid.getTimestamp(parsed);
    out.formatted = parsed;
    out.minified = parsed;
  }
  return out;
}