# Eaton IDs

Light wrapper around assorted ID generatrion functions. Currently:

- `nanoid(size?: number, alphabet?: string)` wraps the nanoid library.
- `uuid(input: any)` generates a random UUID4 if no input is given. If input IS given, it's hashed using the object-hash library, and a UUID5 is generated from the hash data.
