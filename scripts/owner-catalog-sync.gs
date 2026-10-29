/**
 * PM STORE — sinkronisasi katalog publik (akun Owner saja).
 * Pasang di Extensions > Apps Script pada spreadsheet MASTER OWNER.
 * Jangan bagikan file Master Owner atau deployment Apps Script kepada karyawan.
 */
const PM_CATALOG = Object.freeze({
  sourceSheet: "KATALOG_WEBSITE",
  targetSpreadsheetId: "1nLFK_zAtJnbHmQZRV3n9jMtc3oiOQ6RZdFnFjypd0SI",
  targetSheet: "KATALOG_PUBLIK",
  allowedHeaders: ["Nama_Produk", "Harga", "Kategori", "Garansi", "Grade_Kondisi", "Battery_Health", "Foto_URL", "Status_Stok"],
});

function sinkronKatalogPmStore() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error("Sinkronisasi lain masih berjalan");
  try {
    const source = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PM_CATALOG.sourceSheet);
    if (!source) throw new Error("Tab KATALOG_WEBSITE tidak ditemukan");
    const values = source.getDataRange().getDisplayValues();
    if (!values.length) throw new Error("Header katalog tidak ditemukan");
    const headers = values[0].map(h => String(h).trim());
    const indices = PM_CATALOG.allowedHeaders.map(name => headers.indexOf(name));
    if (indices.some(index => index < 0)) throw new Error("Kolom katalog berubah. Sinkronisasi dibatalkan.");

    const rows = values.slice(1).map(row => indices.map(index => String(row[index] || "").trim()))
      .filter(row => row[0] && row[1] && row[2])
      .filter(row => !/^(habis|sold|sold out|0)$/i.test(row[7]));
    const targetBook = SpreadsheetApp.openById(PM_CATALOG.targetSpreadsheetId);
    const target = targetBook.getSheetByName(PM_CATALOG.targetSheet);
    if (!target) throw new Error("Tab publik tidak ditemukan");

    // Hindari penghapusan katalog ketika sumber tidak sengaja kosong.
    if (!rows.length) {
      Logger.log("Tidak ada produk valid. Katalog publik TIDAK diubah.");
      return;
    }

    const requiredRows = rows.length + 1;
    if (target.getMaxRows() < requiredRows) target.insertRowsAfter(target.getMaxRows(), requiredRows - target.getMaxRows());
    const oldRows = Math.max(target.getLastRow(), 1);
    target.getRange(1, 1, Math.max(oldRows, requiredRows), 8).clearContent();
    target.getRange(1, 1, 1, 8).setValues([PM_CATALOG.allowedHeaders]);
    target.getRange(2, 1, rows.length, 8).setValues(rows);
    SpreadsheetApp.flush();
    Logger.log("Sinkronisasi berhasil: " + rows.length + " produk.");
  } finally { lock.releaseLock(); }
}
