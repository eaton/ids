import ISBN3 from 'isbn3';
import { Info } from '../types';
const { parse, hyphenate } = ISBN3;

export function asin(input: string) {
  return asin.parse(input);
}
asin.parse = (input: string | URL) => {
  const trimmed = input.toString().trim();
  if (URL.canParse(trimmed)) {
    return asin.fromURL(trimmed);
  }
  if (asin.isValid(trimmed)) {
    return trimmed;
  }
  return undefined;
}
const asinOrISBN10 = '(B[\\dA-Z]{9}|\\d{9}(?:X|\\d))';
const amazonUrlPrefix = '(?:dp|gp\\/video\\/detail|gp\\/product)';

asin.isValid = (input: string) => new RegExp('^' + asinOrISBN10 + '$').test(input);
asin.isISBN = (input: string) => !!parse(input)?.isbn10;
asin.fromURL = (input: string | URL): string | undefined => {
  const pattern = new RegExp('\/' + amazonUrlPrefix + '\/' + asinOrISBN10);
  const value = pattern.exec(input.toString())?.[1];
  return (value && asin.isValid(value)) ? value : undefined;
}
asin.minify = (input: string) => asin.format(input);
asin.format = (input: string, style: 'asin' | 'isbn10h' | 'url' = 'asin') => {
  if (asin.isValid(input)) {
    switch (style) {
      case 'asin':
        return input;
      case 'isbn10h':
        if (asin.isISBN(input)) return hyphenate(input);
        return undefined;
      case 'url':
        return 'https://www.amazon.com/dp/' + input;
    }
  }
  return undefined;
}
asin.inspect = (input: string | URL) => {
  const parsed = asin.parse(input);
  const out: Info = {
    input,
    isValid: !!parsed,
  };

  if (parsed) {
    out.isISBN = asin.isISBN(parsed),
    out.formatted = asin.format(parsed),
    out.minified = asin.minify(parsed),
    out.isbn10h = asin.format(parsed, 'isbn10h');
    out.url = asin.format(parsed, 'url');
  }
  return out;
}