const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(name, ...args) {
  return originalResolve.call(this, name.startsWith('@/') ? path.resolve(__dirname, '../src', name.slice(2)) : name, ...args);
};
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 }
  }).outputText, filename);
};
const { normalizeRows } = require('../src/lib/normalize.ts');
const { getCatalog } = require('../src/lib/products.ts');
const sample = { Nama_Produk: 'iPhone 13 Pro 128 GB', Harga: 'Rp 9.500.000', Kategori: 'iPhone', Garansi: 'IBox', Grade_Kondisi: 'A', Battery_Health: '90%', Foto_URL: 'https://example.com/phone.jpg', Status_Stok: 'Ready', Chat_Admin: 'https://wa.me/628123456789?app_absent=0', Catatan_Internal: 'PRIVATE' };
const products = normalizeRows([sample, { Kategori: 'MacBook' }, {}], 'catalog');
assert.equal(products.length, 1);
const p = products[0];
assert.equal(p.priceValue, 9500000);
assert.equal(p.condition, 'A');
assert.equal(p.stockStatus, 'in_stock');
assert.equal(p.imageUrl, sample.Foto_URL);
assert(!p.searchText.includes('PRIVATE'));
assert(p.specs.some(s => s.label === 'Battery Health' && s.value === '90%'));
const chat = new URL(p.chatUrl);
assert.equal(chat.searchParams.get('app_absent'), '0');
assert(chat.searchParams.get('text').includes(sample.Nama_Produk));
const blank = normalizeRows([{ Nama_Produk: 'Produk tanpa harga' }], 'catalog')[0];
assert.equal(blank.priceLabel, 'Hubungi Admin');
assert.equal(blank.stockStatus, 'unknown');
assert.equal(blank.chatUrl, null);
(async () => {
  global.fetch = async url => {
    assert.equal(new URL(url).searchParams.get('sheet'), 'KATALOG_WEBSITE');
    return new Response(JSON.stringify([sample]));
  };
  assert.equal((await getCatalog()).ok, true);
  global.fetch = async () => new Response(JSON.stringify({ error: 'sheet unavailable' }));
  assert.equal((await getCatalog()).ok, false);
  global.fetch = async () => new Response('[]');
  assert.deepEqual((await getCatalog()).products, []);
  if (process.argv[2]) {
    const live = normalizeRows(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')), 'catalog');
    console.log(`Data API: ${live.length} produk valid; ${live[0]?.priceLabel}`);
  }
  console.log('Pemetaan kolom, baris kosong, harga, stok, chat, dan error API: lulus.');
})().catch(error => { console.error(error); process.exitCode = 1; });
