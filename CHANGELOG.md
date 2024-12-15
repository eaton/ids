# CHANGELOG

## v1.2.0

- Default the internal stringify function to leave plain strings untouched; this ensures calling it repeatedly won't create different string values.

## v1.1.0

- Upgrade to UUID 11 for UUIDv7 support
- Switch from Ava to Node-Tap; slower but infinitely less fussy
- Replaced `ulid` library with `ulidx` for free time extraction
