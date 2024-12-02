# Eaton IDs

A wrapper/nomralizer around libraries for a bunch of different ID and hash formats I've had to deal with on my personal projects. Broadly, I'm less interested in efficiency here than giving myself a consistent set interface for using (and occasionally switching between) different ID and hash formats.

If you need something lightweight to deal with one particular ID type or generate hashes for a specific purpose, it'll be much simpler to pull in one of the specific libraries this one uses under the hood:

- [nanoid](https://github.com/ai/nanoid) to generate fast, URL-safe unique IDs
- [ulid](https://github.com/perry-mitchell/ulidx) to generate and parse ULIDs (might replace with UUIDv7)
- [uuid](https://github.com/uuidjs/uuid) to generate UUIDv1-UUIDv7
- [uuid25](https://github.com/uuid25/javascript) to parse and format assorted representations of UUID data
- [fnv1a](https://github.com/sindresorhus/fnv1a) to generate quick, variable-length hashes of strings.
- [gtin](https://github.com/xbpf/gtin) to validate and parse GTIN, UPC, EAN, etc.
- [isbn3](https://github.com/inventaire/isbn3) to validate, parse, and convert between ISBN10 and ISBN13

## What's In Here

Everything is broken down into three kinds of things:

- `Generators` are functions that spit out random IDs when called. They may support additional parameters to control the ID generation process; nanoid, for example, accepts optinoal `length` and custom alphabet properties but does fine without them.
- `Hashers` accept some *thing* that a hash value is being generated for. They, too, may accept additional parameters to control the hash generation process but without the thing-to-be-hashed they're just an ID generator.
- `Helpers` are a set of standard sub-properties to validate, format, and inspect already-created IDs and hashes. Some Generators and Hashers also support Helpers.
  - `<helper>.extract(input: NotUndefined)` returns an ID when given some messy input data, or `undefined` if an ID can't be found. This is intended as a tool for extracting valid IDs from potentially messy input, for example turning Amazon URLs into ASINs when possible.
  - `<helper>.isValid(input: string)` to validate input data, returning true or false.
  - `<helper>.format(input: string, style?: string)` to pretty-print the parsed ID in its canonical format. Some ID types support additional format types as a second parameter.
  - `<helper>.minify(input: string)` to output the shortest valid format of the ID, if available. A hyphenated North American ISBN-13 is collapsed to an unhyphenated ISBN-10 if possible, for example.
  - `<helper>.inspect(input: string)` to return the parsed information inside an ID format. At the very least, the `isValid` property of this information will be populated with a boolean. If the ID can be parsed, the `formatted` and `minified` properties will also be populated. Other formats add fun stuff like "is there a timestamp hidden in the first *n* bytes" and "is this ISBN for Japan or Europe" and so on.

Generators are only meant to *create* unique IDs given a set of input parameters. NanoID, ULID, and UUIDv1/v3/v5 are examples.

Hashers are meant to accept almost any input and generate some kind of easily-comparable representation on the other side. Nanohash and UUIDv5/v7 are examples.

## Hashes

- `hash(input: NotUndefined)` just wraps the [object-hash](https://github.com/puleos/object-hash) library for convenience.
- `md5()`, `sha1()`, `sha256()`, `sha256()` are convenience wrappers for `object-hash`'s algorithm-specific hashing options.
- See `nanohash`, below, for an alternative that's not quite as secure but nice and short.

## NanoIDs

- `nanoid(size?: number, alphabet?: string)` wraps the nanoid library, which generates arbitrarily-sized, url-safe, collision-resistant IDs. Shorter than UUIDs by default, with options to control the dictionary of characters used and the final length of the ID.
- `nanohash(input: any, size?: number, alphabet?: string)` uses a [simpler hashing algorithm](https://github.com/planttheidea/hash-it) than the UUID and hash helpers, but leverages the [bufferbase](https://github.com/misebox/bufferbase) library to convert them into the same dictionary-based format as nanoid. By default hashes are 7 characters long, but that will shift around if longer/shorter alphabets are passed in.
- `alphabets` is a useful list of potential character sets that can be used with nanoid and nanohash. URL Safe strings are the default for both, but options like 'Uppercase' and 'NoLookalikes' can be handy as well.

## UUIDs

- `uuid()` generates a random UUID4.
- `uuid(input: any)` uses `hash.sha1` from the hashing helper functions, but formats the resulting value as a UUID5. If an explicit null value is given, the [nil UUID](https://datatracker.ietf.org/doc/html/rfc4122.html#section-4.1.7) is returned.
- `uuid.isValid(input: string)` can be used to check an existing string.
- `uuid.random()` can be used to unambiguously generate a random UUID4.
- `uuid.setNamespace()` can be used to set a custom namespace for UUID5 generation; it must be a valid UUID.
- `uuid.namespaces` provides convenience consts for the official [URL and DNS namespaces](https://datatracker.ietf.org/doc/html/rfc4122.html#appendix-C); `uuid.namespaces.fyi` is the one I use by default.

## ULIDs

- `ulid()` generates a unique, creation-time-sortable identifier that's URL-safe and a touch shorter than a UUID. Uses the [ulid](https://github.com/perry-mitchell/ulidx) library.

## Some special ID formats

I do a lot of wrangling with my book and media collections; while they're neither hashes nor random IDs, ISBN and ASIN parsing/formatting is folded in here because I'm a huge nerd. Fun.

### ISBNs

- `isbn(input: string)` parses and returns detailed information about the internal structure of any valid ISBN; if valid, the `isbn10` and `isbn13` properties can be used to retrieve both permutations if available.
- `isbn.asIsbn13(input: string)` is a useful shortcut, returning `undefined` if the ISBN is invalid, and expanding ISBN10s to the full 13 digits, in one step.

### Amazon Product IDs

- `asin(input: string)` returns the raw input if it's a plausibly-formatted Amazon product ID, and `undefined` if it isn't.
- `asin.isValid()` and `asin.isIsbn(input: string)` functions are useful for explicit validation
- `asin.asUrl(input: string)` returns a full Amazon product URL for the ID if it's valid.
