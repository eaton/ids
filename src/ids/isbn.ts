import ISBN3 from 'isbn3';
const { parse, audit, asIsbn10, asIsbn13, hyphenate } = ISBN3;

export function isbn(input: string) {
  return parse(input) ?? undefined;
}

isbn.isbn10 = asIsbn10;
isbn.isbn13 = asIsbn13;
isbn.format = hyphenate;
isbn.audit = audit;
isbn.isValid = (input: string) => parse(input)?.isValid ?? false;