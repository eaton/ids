import * as uuidLib from 'uuid';
import { Uuid25 } from 'uuid25';
import hash from 'object-hash';
import { NotUndefined } from 'object-hash';
import type { Info } from '../types.js';

type styles = 'braced' | 'hex' | 'hyphenated' | 'urn' | 'uuid25';

/**
 * Given input, hashes the input and generates a UUID string from the
 * hash value. If no input is given, a random UUID is returned.
 */
export function uuid(input?: unknown): string {
  if (input === null && uuid.nil) return uuid.nil;
  if (input !== undefined) return uuid.hash(input);
  return uuid.random()
}

uuid.parse = (input: NotUndefined) => {
  const raw = input?.toString() || '';
  try {
    return Uuid25.parse(raw).value !== undefined;
  } catch {
    return undefined;
  }
}

uuid.isValid = (input: string) => {
  return uuidLib.validate(input);
}

uuid.minify = (input: string) => uuid.format(input, 'hex');

uuid.format = (input: string, style: styles = 'hyphenated') => {
  try {
    const parsed = Uuid25.parse(input);
    switch (style) {
      case 'braced':
        return parsed.toBraced();
      case 'hyphenated':
        return parsed.toHyphenated();
      case 'hex':
        return parsed.toHex();
      case 'urn':
        return parsed.toUrn();
      case 'uuid25':
        return parsed.value;
    }
  } catch {
    return undefined;
  }
}

uuid.bytes = (input: string) => {
  try {
    const parsed = Uuid25.parse(input);
    return parsed.toBytes();
  } catch {
    return undefined;
  }
}

uuid.inspect = (input: string) => {
  const out: Info = {
    input: input,
    isValid: uuidLib.validate(input),
  };
  
  if (out.isValid) {
    const parsed = Uuid25.parse(input);

    out.version = uuidLib.version(input);
    if (out.version === 1 || out.version === 7) {
      out.date = uuid.getDate(input);
      out.timestamp = uuid.getTimestamp(input);
    }

    out.minified = parsed.value;
    out.formatted = parsed.toHyphenated();

    out.styles = {
      braced: parsed.toBraced(),
      hex: parsed.toHex(),
      hyphenated: out.minified,
      urn: parsed.toUrn(),
      uuid25: out.minified,
    }
  
    bytes: parsed.toBytes();
  }
  return out;
}

uuid.v1 = uuidLib.v1;
uuid.v3 = uuidLib.v3;
uuid.v4 = uuidLib.v4;
uuid.v5 = uuidLib.v5;
uuid.v6 = uuidLib.v6;
uuid.v7 = uuidLib.v7;

uuid.random = uuidLib.v4;

uuid.hash = (input: NotUndefined) => {
  return uuidLib.v5(
    hash(input, { algorithm: 'passthrough' }),
    uuid.getNamespace()
  );
}

uuid.sortable = (input?: number | Date) => {
  if (input === undefined) return uuidLib.v7();
  if (typeof input === 'number') return uuidLib.v7({ msecs: input });
  else return uuidLib.v7({ msecs: input.getTime() });
}

uuid.url = (input: string | URL) => uuidLib.v5(input.toString(), uuidLib.v5.URL);

uuid.nil = uuidLib.NIL;

uuid.max = uuidLib.MAX;

uuid.namespaces = {
  fyi: '5713d04c-59b3-430e-b75f-e43e44754795',
  url: uuidLib.v5.URL,
  dns: uuidLib.v5.DNS,
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

uuid.getDate = (input: string) => {
  try {
    const parsed = Uuid25.parse(input).toHyphenated();
    const version = uuidLib.version(parsed);
    if (version === 1) return v1date(parsed);
    if (version === 7) return v7date(parsed);
  } catch {
    return undefined;
  }
}

uuid.getTimestamp = (input: string) => uuid.getDate(input)?.valueOf();

const v1date = (input: string) => {
  const parts = input.split('-');
  const time = [
    parts[2].substring(1),
    parts[1],
    parts[0]
  ].join('');
  return new Date(parseInt(time, 16));
}

const v7date = (input: string) => {
  const parts = input.split('-');
  const time = parts[0] + parts[1].slice(0, 4);
  return new Date(parseInt(time, 16));
}