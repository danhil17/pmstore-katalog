# PM STORE — katalog

## Sumber data

Website membaca **hanya tab `KATALOG_WEBSITE`** melalui server Next.js. Header baris pertama:

`Nama_Produk | Harga | Kategori | Garansi | Grade_Kondisi | Battery_Health | Foto_URL | Status_Stok`

- Satu baris per produk. Baris tanpa nama tidak ditampilkan.
- Harga bisa angka `9500000` atau `Rp 9.500.000`. Kosong berarti Hubungi Admin.
- Foto_URL harus URL gambar HTTP/HTTPS yang dapat diakses pengunjung.
- Status_Stok menerima Ready/Tersedia, Habis, Preorder, atau jumlah. Kosong tidak dianggap tersedia.
- Tambahkan kolom opsional `Chat_Admin` untuk link kontak per produk, dan `ID` untuk identitas tetap ketika baris diurutkan.
- Jangan memasukkan data internal ke tab publik.

Data server diperbarui melalui cache 60 detik; perubahan dapat terlihat setelah kunjungan berikutnya memicu pembaruan cache. Halaman yang sudah terbuka perlu dimuat ulang.

## Vercel

Deploy branch `main`. Endpoint bawaan sudah memakai API katalog yang diverifikasi. Bila ingin mengganti, atur environment variable server **SHEETDB_URL**. Jangan gunakan prefix NEXT_PUBLIC untuk kredensial.

Jika autentikasi Bearer diaktifkan di SheetDB, atur **SHEETDB_TOKEN** di Vercel lalu redeploy. Token tidak dikirim ke browser.

Pembatasan tab dalam kode website tidak membatasi akses langsung ke SheetDB. Untuk spreadsheet master yang berisi data internal, gunakan spreadsheet khusus katalog atau aktifkan autentikasi pada SheetDB dan simpan token hanya di server.

## Pengecekan

```sh
npm ci
npm run lint
npm run typecheck
npm run build
node scripts/check-catalog.cjs
```

Informasi alamat, jam operasional, dan kontak toko ada di `src/lib/store.ts`. Isi hanya informasi yang sudah terverifikasi.
