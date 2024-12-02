import sind_fnv1a from '@sindresorhus/fnv1a';
import { stringify } from './hash.js';
import type { NotUndefined } from './hash.js';

export function fnv1a(input: NotUndefined, size: 32 | 64 | 128 | 256 | 512 | 1024 = 32) {
  return sind_fnv1a(stringify(input), { size });
}

export function fnv1a64(input: NotUndefined) {
  return sind_fnv1a(stringify(input), { size: 64 }).toString();
}

export function fnv1a128(input: NotUndefined) {
  return sind_fnv1a(stringify(input), { size: 128 }).toString();
}
