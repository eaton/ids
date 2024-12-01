import ISBN3 from 'isbn3';
import { Info } from '../types';
const { parse, audit, asIsbn10, asIsbn13, hyphenate } = ISBN3;

/**
 * International Standard Book Numbers are kind-of-usually-unique IDs for
 * commercially sold print and electronic books. The original 1967 era ISBN
 * format is now known as ISBN-10; modern ISBNs are 13 characters long and
 * are compatible with European EAN identifiers.
 * 
 * The top-level `isbn()` function is a convenience alias for `isbn.parse()`.
 *
 * @returns A valid ISBN string, or `undefined`
 */
export function isbn(input: string) {
  return parse(input) ?? undefined;
}

isbn.parse = (input: string) => { 
  const parsed = parse(input.trim());
  if (parsed) {
    return parsed.isbn13 ?? parsed.isbn10;
  }
  return undefined;
}
isbn.isValid = (input: string) => parse(input)?.isValid ?? false;
isbn.inspect = (input: string) => {
  const parsed = parse(input);
  const out: Info = {
    input,
    isValid: !!parsed?.isValid,
  };

  if (parsed) {
    out.formatted = hyphenate(input);
    out.minified = isbn.minify(input);

    out.segments = {
      prefix: parsed.prefix,
      group: `${parsed.group} (${parsed.groupname})`,
      publisher: parsed.publisher,
      article: parsed.article,
      check: parsed.check
    }

    out.styles = {
      isbn10: parsed.isbn10,
      isbn13: parsed.isbn13,
      isbn10h: parsed.isbn10h,
      isbn13h: parsed.isbn13h,
    }
  } else {
    out.clues = audit(input).clues.map(c => c.message);
  }
  return out;
}

isbn.isbn10 = asIsbn10;
isbn.isbn10h = (input: string) => hyphenate(asIsbn10(input));
isbn.isbn13 = asIsbn13;
isbn.isbn13h = (input: string) => hyphenate(asIsbn13(input));

isbn.format = hyphenate;
isbn.minify = (input: string) => isbn.isbn10(input) ?? isbn.isbn13(input);
