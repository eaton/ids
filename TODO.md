# TODO

## Release blockers

- [x] Migrate existing ID generators, Hashers, and Parser/Validators to the new style
- [ ] Migrate the weird function-with-methods stuff to explicit function exports and a single default export; use modules to do what modules are good at
- [ ] Settle the object/string hashing divide; right now the UUID hashing behavior is different than nano/pico hash

## Future

- [ ] Optional url normalization helpers for URL hashing
- [ ] Branding support for ID/Hash validators and generators, potentially using [ts-brand](https://github.com/kourge/ts-brand)
