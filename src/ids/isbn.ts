import ISBN3 from 'isbn3';
import { Info } from '../types';
const { parse, audit, asIsbn10, asIsbn13, hyphenate } = ISBN3;

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
    out.minified = parsed.isbn10 ?? parsed.isbn13;

    out.segments = {
      prefix: parsed.prefix,
      group: `${parsed.group} (${parsed.groupname})`,
      publisher: parsed.publisher,
      article: parsed.article,
      check: parsed.check
    }

    out.isbn10 = parsed.isbn10;
    out.isbn13 = parsed.isbn13;
  }
  return out;
}

isbn.isbn10 = asIsbn10;
isbn.isbn13 = asIsbn13;
isbn.format = hyphenate;
isbn.minify = asIsbn10;
