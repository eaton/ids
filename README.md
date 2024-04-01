# Eaton IDs

Light wrapper around assorted ID generatrion functions. Currently:

- `nanoid(size?: number, alphabet?: string)` wraps the nanoid library, handy whne you need random identifiers that are less cumbersome than UUIDs. `urlid(size?: number)` is a shortcut for making a nanoid with URL-safe characters.
- `uuid(input: any)` generates a random UUID4 if no input is given. If input IS given, it's hashed using the object-hash library, and a UUID5 is generated from the hash data. `uuid.isValid(input: string)` can be used to check an existing string, and `uuid.random()` can be used to unambiguously generate a random UUID4. Finally, `uuid.setNamespace()` can be used to alter the UUID that serves as a namespace when creating hashed UUID5s.
- `fyid(input: string)` generates a loosely URN-like unique identifier for an item in my personal knowledgebase. ISBNs, ASINs, and UUIDs are automatically recognized. This will almost certainly change, get a validator, and get a dedicated `expand()` function to converting short fyid syntax into a 'full' fyid. (`:0123456789` to `:isbn:)
- `ssn.isValid(input: string)` and `ssn.format(input: string)` validate and pretty-print US Social Security Numbers, which would be terrible to use in a random personal web project but serve as a nice test case.
