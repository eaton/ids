# Eaton IDs

Light wrapper around assorted ID generation and validation functions. Currently:

## Amazon Product IDs

- `asin(input: string)` returns the raw input if it's a plausibly-formatted Amazon product ID, and `undefined` if it isn't.
- `asin.isValid()` and `asin.isIsbn(input: string)` functions are useful for explicit validation
- `asin.asUrl(input: string)` returns a full Amazon product URL for the ID if it's valid.

## ISBNs

- `isbn(input: string)` parses and returns detailed information about the internal structure of any valid ISBN; if valid, the `isbn10` and `isbn13` properties can be used to retrieve both permutations if available.
- `isbn.asIsbn13(input: string)` is a useful shortcut, returning `undefined` if the ISBN is invalid, and expanding ISBN10s to the full 13 digits, in one step.

## Hashes

- `hash(input: NotUndefined)` just wraps the [object-hash](https://github.com/puleos/object-hash) library for convenience.
- `md5()`, `sha1()`, `sha256()`, `sha256()` are convenience wrappers for `object-hash`'s algorithm-specific hashing options.
- See `nanohash`, below, for an alternative that's not quite as secure but nice and short.

## NanoIDs

- `nanoid(size?: number, alphabet?: string)` wraps the nanoid library, which generates arbitrarily-sized, url-safe, collision-resistant IDs. Shorter than UUIDs by default, with options to control the dictionary of characters used and the final length of the ID.
- `nanohash(input: any, size?: number, alphabet?: string)` uses a [simpler hashing algorithm](https://github.com/planttheidea/hash-it) than the UUID and hash helpers, but leverages the [bufferbase](https://github.com/misebox/bufferbase) library to convert them into the same dictionary-based format as nanoid. By default hashes are 7 characters long, but that will shift around if longer/shorter alphabets are passed in.
- `alphabets` is a useful list of potential character sets that can be used with nanoid and nanohash. URL Safe strings are the default for both, but options like 'Uppercase' and 'NoLookalikes' can be handy as well.

## Social Security Numbers

- `ssn.isValid(input: string)` validates US Social Security Numbers, which would be terrible to use in a random personal web project but serve as a nice test case.
- `ssn.format(input: string)` pretty-prints SSNs with dashes in the proper locations.

## UUIDs

- `uuid()` generates a random UUID4.
- `uuid(input: any)` uses `hash.sha1` from the hashing helper functions, but formats the resulting value as a UUID5. If an explicit null value is given, the [nil UUID](https://datatracker.ietf.org/doc/html/rfc4122.html#section-4.1.7) is returned.
- `uuid.isValid(input: string)` can be used to check an existing string.
- `uuid.random()` can be used to unambiguously generate a random UUID4.
- `uuid.setNamespace()` can be used to set a custom namespace for UUID5 generation; it must be a valid UUID.
- `uuid.namespaces` provides convenience consts for the official [URL and DNS namespaces](https://datatracker.ietf.org/doc/html/rfc4122.html#appendix-C); `uuid.namespaces.fyi` is the one I use by default.

## ULIDs

- `ulid()` generates a unique, creation-time-sortable identifier that's URL-safe and a touch shorter than a UUID. Uses the [ulid](https://github.com/ulid/javascript) reference library.
