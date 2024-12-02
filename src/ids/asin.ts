import ISBN3 from 'isbn3';
import { Info } from '../types';
const { parse, hyphenate } = ISBN3;

const asinOrISBN10 = '(B[\\dA-Z]{9}|\\d{9}(?:X|\\d))';
const amazonUrlPrefix = '(?:dp|gp\\/video\\/detail|gp\\/product)';

/**
 * Amazon Product Identifiers generally consist of a 10-character alphanumeric
 * string starting with a 'B', *or* a valid ISBN10. The format isn't officially
 * documented; in the future additional letter codes may be added to expand
 * the range of IDs.
 * 
 * @see [the story behind asins](https://inventlikeanowner.com/blog/the-story-behind-asins-amazon-standard-identification-numbers/)
 * 
 * The top-level `asin()` function is a convenience alias for `asin.parse()`.
 *
 * @returns A valid ASIN string, or `undefined`
 */
export function asin(input: string) {
  return asin.parse(input);
}

/**
 * Attempts to extract a valid Amazon product ID from a string or URL.
 * 
 * @returns A valid ASIN string, or `undefined`
 */
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

asin.isValid = (input: string) => new RegExp('^' + asinOrISBN10 + '$').test(input);
asin.isISBN = (input: string) => !!parse(input)?.isbn10;

/**
 * Attempts to extract a valid Amazon product ID URL. This will reject
 * raw but valid ASINs if they're not actually part of an Amazon URL. 
 *
 * @returns A valid ASIN string, or `undefined`
 */
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

/**
 * Attempts to extract a valid Amazon product ID from a string or URL,
 * and returns as much information about the ASIN as possible.
 *
 * @returns A valid ASIN string, or `undefined`
 */
asin.inspect = (input: string) => {
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