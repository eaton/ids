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
- See `nanohash`, below, for an md5 hash formatted to match the `nanoid` IDs.

## EatonFYI internal IDs

- `fyid(input: string)` generates a loosely URN-like unique identifier for an item in my personal knowledgebase. ISBNs, ASINs, and UUIDs are automatically recognized. This will almost certainly change, get a validator, and get a self-contained `expand()` function to convert short fyid syntax into 'full' fyids. (e.g., `:1138493988` to `:isbn:9781138493988`)

## NanoIDs

- `nanoid(size?: number, alphabet?: string)` wraps the nanoid library, which generates arbitrarily-sized, url-safe, collision-resistant IDs. Shorter than UUIDs by default, with options to control the dictionary of characters used and the final length of the ID.
- `nanohash(input: any, size?: number, alphabet?: string)` uses the same size/alphabet options as nanoid, but the data is the hash of an input object or string rather than a random value. Under the hood, it uses the same `object-hash` library as the `uuid()` function, along with the [bufferbase](https://github.com/misebox/bufferbase) library to handle the dictionary-based string conversion.
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
