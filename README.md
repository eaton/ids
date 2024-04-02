# Eaton IDs

Light wrapper around assorted ID generation and validation functions. Currently:

## Amazon Product IDs

`asin(input: string)` returns the raw input if it's a plausibly-formatted Amazon product ID, and `undefined` if it isn't. The `asin.isValid()` and `asin.isIsbn(input: string)` functions are useful for explicit validation, and `asin.asUrl(input: string)` returns a full Amazon product URL for the ID if it's valid.

## ISBNs

`isbn(input: string)` parses and returns detailed information about the internal structure of any valid ISBN; if valid, the `isbn10` and `isbn13` properties can be used to retrieve both permutations if available. `isbn.asIsbn13(input: string)` is a useful shortcut, returning `undefined` if the ISBN is invalid, and expanding ISBN10s to the full 13 digits, in one step.

## EatonFYI internal IDs

`fyid(input: string)` generates a loosely URN-like unique identifier for an item in my personal knowledgebase. ISBNs, ASINs, and UUIDs are automatically recognized. This will almost certainly change, get a validator, and get a self-contained `expand()` function to convert short fyid syntax into 'full' fyids. (e.g., `:1138493988` to `:isbn:9781138493988`)

## NanoIDs

`nanoid(size?: number, alphabet?: string)` wraps the nanoid library, handy whne you need random identifiers that are less cumbersome than UUIDs. `urlid(size?: number)` is a shortcut for making a nanoid with URL-safe characters. Similarly, the `nanohash(input: any, size?: number, alphabet?: string)` function uses the same alphabet to encode a hash value, optionally slicing it to a desired length. (Obviously, at the cost of hash collision probability).

## Social Security Numbers

`ssn.isValid(input: string)` and `ssn.format(input: string)` validate and pretty-print US Social Security Numbers, which would be terrible to use in a random personal web project but serve as a nice test case.

## UUIDs

`uuid(input: any)` generates a random UUID4 if no input is given. If input IS given, it's hashed using the object-hash library, and a UUID5 is generated from the hash data. `uuid.isValid(input: string)` can be used to check an existing string, and `uuid.random()` can be used to unambiguously generate a random UUID4. Finally, `uuid.setNamespace()` can be used to alter the UUID that serves as a namespace when creating hashed UUID5s.
