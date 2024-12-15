# Reference Links

In the process of assembling this library I've accumulated a slightly ridiculous list of the way various things I track are identified.

## Books and Publications

- International Standard Book Number (ISBN, ISBN-10, ISBN-13):
- Dewey Decimal Code (DDC):
- Library of Congress Catalog Number (LCCN):
- International Standard Serial Number (ISSN):

## Audio/Visual Media

- International Standard Audiovisual Number (ISAN):
- Entertainment Identifier Registry ID (EIDR-ID):
- International Standard Music Number (ISMN):
- International Standard Recording Code (ISRC): A 12-character identifier for video and audio recordings. Identifies the particular recording, not the work itself. Thus, a remastered version of old tapes would get a new ISRC.
- Global Release Identifier (GRID): An 18-character identifier for electronically distributed music recordings.

## Products and Commerce

- European Article Number (EAN): A 13-digit product ID now subsumed into the GTIN standard. EAN is equivalent to GTIN-13.
- Universal Product Code (UPC): Now subsumed into GTIN; UPCs are often treated as a synonym for 'barcodes' but any number can be printed in barcode format. Not all barcodes are valid UPCs, GTINs, etc.
- Global Trade Identification Number (GTIN, GTIN-8, GTIN-10, GTIN-11, GTIN-12, GTIN-13, GTIN-14): The meta-ID format slowly gobbling up all trade-related stuff. GTIN-13 in particular is a kind of 'USB3 for other IDs' in that the country code and first digit or two define sub-ranges that contain whole other formats. GTIN-13s with the '978' country code are ISBN-13s; GTIN-13s with '977' are ISSNs, and GTIN-13s that start with '979-0' are ISMNs.
- Amazon Standard Identification Number (ASIN): All Amazon-sold products have an ASIN, even digital products, subscriptions, etc. All ISBN-10s are also valid ASINs, and all non-ISBN10-bearing products start with a letter rather than a number. Note that some ASIN-bearing products are specific editions of otherwise ISBN-bearing books.
- Amazon Fulfillment Network Stock Keeping Unit (FNSK): Products with loads of internal variations (an ASIN that comes in 50 colors, say) get FNSKs to identify each variation. This helps avoid explosive ASIN consumption by pop-up dropshippers.
- Stock-Keeping Unit (SKU): This is what giving up is like. There is no standard for SKUs, it's just a term used to refer to "some number a company uses to keep track of its things."
