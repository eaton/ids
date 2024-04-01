import test from 'ava';
import { fyid } from '../src/index.js';

test('generate fyids', t => {
  t.is(fyid(':person:some-name'), ':person:some-name');
  t.is(fyid(':1138493988'), ':isbn:9781138493988');
  t.is(fyid(':B085KMWVN7'), ':asin:B085KMWVN7');
  t.is(fyid(':21a576c9-8dcb-462a-b3ad-355608867717'), ':uuid:21a576c9-8dcb-462a-b3ad-355608867717');
  t.is(fyid(':person:some-name'), ':person:some-name');
})

test('alt delimiter', t => {
  t.is(fyid(';B085KMWVN7'), ':asin:B085KMWVN7')
})

test('url ids', t => {
  t.is(fyid('//example.com'), ':url:ecae3db3-bced-5350-899e-07c2755565b0');
  t.is(fyid('https://example.com/'), ':url:ecae3db3-bced-5350-899e-07c2755565b0');
});

test('strict mode', t => {
  t.is(fyid('some random text'), ':uuid:85f376a0-e8af-58f1-a2ce-d9bbe9fb7d97');
  t.is(fyid('some random text', true), false);
});