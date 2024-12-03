import * as lib from 'gtin';
import { Info } from '../types';
import { NotUndefined } from 'object-hash';

/**
 * Convenience alias for the `gtin` function.
 */
export const upc = gtin;

/**
 * Global Trade Item Numbers are used worldwide for identifying and tracking
 * products. While primarily used with barcodes, they can also be used as RFID
 * frequencies. Neat.
 * 
 * A full-length GTIN is 14 digits long; short GTIN formats (8, 10, 11, 13
 * digits, etc), and GTIN-13s are functionally equivalent to North American
 * UPC-A codes.
 * 
 * The top-level `gtin()` function is a convenience alias for `gtin.parse()`.
 *
 * @returns A valid GTIN string, or `undefined`
 */
export function gtin(input: string) {
  return gtin.parse(input);
}

gtin.isValid = (input: string) => {
  try {
    return gtin.parse(input) !== undefined;
  } catch {
    return false;
  }
}

gtin.parse = (input: NotUndefined) => { 
  const trimmed = input?.toString().trim().replaceAll('-', '');
  if (!trimmed) return undefined;

  try {
    if (lib.isGTIN(trimmed)) {
      return trimmed;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

gtin.format = gtin.parse
gtin.minified = (input: string) => {
  const parsed = gtin.parse(input);
  return parsed ? lib.minify(parsed) : undefined;
}

gtin.inspect = (input: string) => {
  const parsed = gtin.parse(input);
  const out: Info = {
    input: input,
    isValid: !!parsed,
  }

  if (parsed) {
    out.isChecked = gtin.isValid(parsed);
    out.type = lib.getFormat(parsed);
    out.country = gtin.prefix(parsed);
    out.formatted = gtin.format(parsed);
    out.minified = lib.minify(parsed);
  }
  return out;
}

/**
 * Given a valid GTIN with a prefix code, return the country/region/space.
 * 
 * @see [GS1.org](https://www.gs1.org/standards/id-keys/company-prefix)
 */
gtin.prefix = (input: string): string | undefined => {
  const code = gtin.parse(input);
  if (!code) return undefined;
  const minified = lib.minify(code);
  if (minified.length < 12 || minified.length > 13) return undefined;
  const val = Number(minified.slice(0,3));

  if (val >= 1 && val <= 19) return 'UPC-A (USA)';
  if (val >= 20 && val <= 29) return 'UPC-A (USA, geo-restricted)';
  if (val >= 30 && val <= 39) return 'UPC-A (USA, drugs)';
  if (val >= 40 && val <= 49) return 'UPC-A (USA, company-specific)';
  if (val >= 50 && val <= 59) return 'UPC-A (USA, reserved)';
  if (val >= 60 && val <= 99) return 'UPC-A (USA)';
  if (val >= 100 && val <= 139) return 'United States';
  if (val >= 200 && val <= 299) return 'Global (geo-restricted)';
  if (val >= 300 && val <= 379) return 'France and Monaco';
  if (val === 380) return 'Bulgaria';
  if (val === 383) return 'Slovenia';
  if (val === 385) return 'Croatia';
  if (val === 387) return 'Bosnia and Herzegovina';
  if (val === 389) return 'Montenegro';
  if (val >= 400 && val <= 440) return 'Germany (440 from East Germany)';
  if (val >= 450 && val <= 459) return 'Japan (Japan Article Number)';
  if (val >= 460 && val <= 469) return 'Russia (inherited from Soviet Union)';
  if (val === 470) return 'Kyrgyzstan';
  if (val === 471) return 'Taiwan';
  if (val === 474) return 'Estonia';
  if (val === 475) return 'Latvia';
  if (val === 476) return 'Azerbaijan';
  if (val === 477) return 'Lithuania';
  if (val === 478) return 'Uzbekistan';
  if (val === 479) return 'Sri Lanka';
  if (val === 480) return 'Philippines';
  if (val === 481) return 'Belarus';
  if (val === 482) return 'Ukraine';
  if (val === 483) return 'Turkmenistan';
  if (val === 484) return 'Moldova';
  if (val === 485) return 'Armenia';
  if (val === 486) return 'Georgia';
  if (val === 487) return 'Kazakhstan';
  if (val === 488) return 'Tajikistan';
  if (val === 489) return 'Hong Kong';
  if (val >= 490 && val <= 499) return 'Japan (Japanese Article Number, legacy)';
  if (val >= 500 && val <= 509) return 'United Kingdom';
  if (val >= 520 && val <= 521) return 'Greece';
  if (val === 528) return 'Lebanon';
  if (val === 529) return 'Cyprus';
  if (val === 530) return 'Albania';
  if (val === 531) return 'North Macedonia';
  if (val === 535) return 'Malta';
  if (val === 539) return 'Ireland';
  if (val >= 540 && val <= 549) return 'Belgium and Luxembourg';
  if (val === 560) return 'Portugal';
  if (val === 569) return 'Iceland';
  if (val >= 570 && val <= 579) return 'Denmark, Faroe Islands and Greenland';
  if (val === 590) return 'Poland';
  if (val === 594) return 'Romania';
  if (val === 599) return 'Hungary';
  if (val >= 600 && val <= 601) return 'South Africa';
  if (val === 603) return 'Ghana';
  if (val === 604) return 'Senegal';
  if (val === 605) return 'Uganda';
  if (val === 606) return 'Angola';
  if (val === 607) return 'Oman';
  if (val === 608) return 'Bahrain';
  if (val === 609) return 'Mauritius';
  if (val === 611) return 'Morocco';
  if (val === 613) return 'Algeria';
  if (val === 615) return 'Nigeria';
  if (val === 616) return 'Kenya';
  if (val === 617) return 'Cameroon';
  if (val === 618) return 'Ivory Coast';
  if (val === 619) return 'Tunisia';
  if (val === 620) return 'Tanzania';
  if (val === 621) return 'Syria';
  if (val === 622) return 'Egypt';
  if (val === 623) return 'GS1 Global Office future use';
  if (val === 624) return 'Libya';
  if (val === 625) return 'Jordan';
  if (val === 626) return 'Iran';
  if (val === 627) return 'Kuwait';
  if (val === 628) return 'Saudi Arabia';
  if (val === 629) return 'United Arab Emirates';
  if (val === 630) return 'Qatar';
  if (val === 631) return 'Namibia';
  if (val === 632) return 'Rwanda';
  if (val >= 640 && val <= 649) return 'Finland';
  if (val >= 680 && val <= 681) return 'China';
  if (val >= 690 && val <= 699) return 'China';
  if (val >= 700 && val <= 709) return 'Norway';
  if (val === 729) return 'Israel';
  if (val >= 730 && val <= 739) return 'Sweden';
  if (val === 740) return 'Guatemala';
  if (val === 741) return 'El Salvador';
  if (val === 742) return 'Honduras';
  if (val === 743) return 'Nicaragua';
  if (val === 744) return 'Costa Rica';
  if (val === 745) return 'Panama';
  if (val === 746) return 'Dominican Republic';
  if (val === 750) return 'Mexico';
  if (val >= 754 && val <= 755) return 'Canada';
  if (val === 759) return 'Venezuela';
  if (val >= 760 && val <= 769) return 'Switzerland and Liechtenstein';
  if (val >= 770 && val <= 771) return 'Colombia';
  if (val === 773) return 'Uruguay';
  if (val === 775) return 'Peru';
  if (val === 777) return 'Bolivia';
  if (val >= 778 && val <= 779) return 'Argentina';
  if (val === 780) return 'Chile';
  if (val === 784) return 'Paraguay';
  if (val === 786) return 'Ecuador';
  if (val >= 789 && val <= 790) return 'Brazil';
  if (val >= 800 && val <= 839) return 'Italy, San Marino and Vatican City';
  if (val >= 840 && val <= 849) return 'Spain and Andorra';
  if (val === 850) return 'Cuba';
  if (val === 858) return 'Slovakia';
  if (val === 859) return 'Czech Republic';
  if (val === 860) return 'Serbia';
  if (val === 865) return 'Mongolia';
  if (val === 867) return 'North Korea';
  if (val >= 868 && val <= 869) return 'Turkey';
  if (val >= 870 && val <= 879) return 'Netherlands';
  if (val >= 880 && val <= 881) return 'South Korea';
  if (val === 883) return 'Myanmar';
  if (val === 884) return 'Cambodia';
  if (val === 885) return 'Thailand';
  if (val === 888) return 'Singapore';
  if (val === 890) return 'India';
  if (val === 893) return 'Vietnam';
  if (val === 894) return 'Reserved for future use';
  if (val === 896) return 'Pakistan';
  if (val === 899) return 'Indonesia';
  if (val >= 900 && val <= 919) return 'Austria';
  if (val >= 930 && val <= 939) return 'Australia';
  if (val >= 940 && val <= 949) return 'New Zealand';
  if (val === 950) return 'GS1 Global Office';
  if (val === 951) return 'EPC General Identifier / EPC Tag Data Standard';
  if (val === 952) return 'GS1 demo use only';
  if (val === 955) return 'Malaysia';
  if (val === 958) return 'Macau';
  if (val >= 960 && val <= 969) return 'GTIN-8';
  if (val === 977) return 'Serial publications (ISSN)';
  if (val >= 978 && val <= 979) return 'Bookland (ISBN-13) and Musicland (ISMN-13)';
  if (val === 980) return 'Refund receipts';
  if (val >= 981 && val <= 999) return 'GS1 coupon identification';
}