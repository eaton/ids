import ISBN3 from 'isbn3';
const { parse } = ISBN3;

export function asin(input: string) {
  return asin.isValid(input) ? input : undefined;
}

asin.productPage = 'https://www.amazon.com/dp/';
asin.isIsbn10 = (input: string) => !!parse(input)?.isbn10;
asin.isValid = (input: string) => (/^\s*(B\d{2}[A-Z\d]{7}|\d{9}[X\d])\s*$/.test(input));
asin.toUrl = (input: string) => asin.isValid(input) ? asin.productPage + input : undefined;