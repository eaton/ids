/**
 * FYI IDs are my own internal referencing system, used on my site to maintain
 * unique identifiers for a variety of different entities that are short but
 * reasonably easy for a human being to enter when banging out queries, markdown
 * frontmatter, and so on.
 * 
 * An FYI ID starts with a colon, is followed by a type identifier, then another
 * colon, then a unique string. In theory, these could be turned into valid URNs
 * by replacing the colons with colons and prefixing the fyi id with `urn:fyi`
 * or something like that.  Let's say it's implied by the leading colon.
 * 
 * "Short form" FYI IDs can ignore the type identifier and JUST provide the unique
 * string *if* that string is a valid ISBN, ASIN, or UUID. In the future I might
 * add additional types to that list if they can be quickly/efficiently identified
 * from their raw string values.
 * 
 * In places where FYI IDs can be specified as references to other documents,
 * fully qualified URL (or protocol-less `//example.com` style URLs) are considered
 * valid, and strings that are *neither* a parsable ID *nor* a URL are treated as
 * one-off named references. It's a very Javascript style of building shit, eh.
 */

import { isbn } from "./isbn.js";
import { asin } from "./asin.js";
import { uuid } from "./uuid.js";

export function fyid(input: string, strict = false) {
  const delimiter = ':';
  let id = input.replaceAll(';', delimiter);

  if (id.startsWith(delimiter)) {
    const segments = id.split(delimiter);
    if (segments.length > 2) {
      return segments.join(delimiter);
    } else if (segments.length = 2) {
      // Short-form. Check if it's an ISBN, an ASIN, or a GUID.

      // If it's an ISBN, we always want to use the ISBN-13 without hyphens.
      // You can turn an ISBN10 into an ISBN13, but only NA ISBN13s can be
      // turned back into ISBN10s.
      if (isbn.isValid(segments[1])) {
        return ['', 'isbn', isbn.isbn13(segments[1])].join(delimiter);
      }

      // Looks ASIN-like, let's assume it is! In theory this will also catch
      if (asin.isValid(segments[1])) {
        return ['', asin.isIsbn10(segments[1]) ? 'isbn' : 'asin', segments[1]].join(delimiter);
      }

      if (uuid.isValid(segments[1])) {
        return ['', 'uuid', segments[1]].join(delimiter);
      }
    } else {
      // An empty ID. Spooooooky.
      return false;
    }

    return false;
  }

  if (input.startsWith('//')) id = 'https:' + id;
  if (URL.canParse(id) ) {
    // Generate a hash of the URL, since it might be too long for a reasonable ID.
    return ['', 'url', uuid(new URL(id))].join(delimiter);
  }

  if (strict) {
    return false;
  } else {
    // In 'lenient' mode we hash whatever we were given and return a UUID.
    return ['', 'uuid', uuid(id)].join(delimiter);
  }
}
