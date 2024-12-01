# TODO

- [x] Migrate existing ID generators, Hashers, and Parser/Validators to the new style.
- [ ] Add branding support to all the ID validator/generators, potentially using [ts-brand](https://github.com/kourge/ts-brand).
- [ ] Implement the EatonFYI ID format, which boils down to `[type][separator][unique-string]`. Gotta work out the details of generating an ID from an existing ID-able object, validating existing IDs, and so on. Among other things, it should return the 'correct' schema.org type and/or list of types for each fyi type.
