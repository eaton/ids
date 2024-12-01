import { Chars } from 'bufferbase';
import { urlAlphabet } from 'nanoid';

export const alphabets = {
  Upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Lower: 'abcdefghijklmnopqrstuvwxyz',
  UrlSafe: urlAlphabet,
  NoLookalikes: '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz',
  DNA: 'GATC',
  Binary: '01',
  Senary: '012345',
  Octal: '01234567',
  ...Chars,
};
