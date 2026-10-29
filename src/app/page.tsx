useEffect(() => {
  fetchProducts();

  // Otomatis tarik data baru setiap 30 detik
  const interval = setInterval(() => {
    fetchProducts();
  }, 30000);

  return () => clearInterval(interval);
}, []);

const fetchProducts = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SHEETDB_URL;
    if (!apiUrl) return;

    // Matikan cache browser dan Vercel pakai &t=${Date.now()} + cache: 'no-store'
    const res = await fetch(`${apiUrl}?sheet=KATALOG_WEBSITE&t=${Date.now()}`, {
      cache: 'no-store',
    });
    const data = await res.json();

    if (Array.isArray(data)) {
      const normalizedProducts: Product[] = data.map((item: ProductRaw) => ({
        Nama_Produk: getValue(item, 'Nama_Produk', 'Nama Produk', 'Nama', 'Produk'),
        Harga: getValue(item, 'Harga', 'Harga Unit', 'Price'),
        Kategori: getValue(item, 'Kategori', 'Category'),
        Garansi: getValue(item, 'Garansi', 'Garansi Unit'),
        Grade_Kondisi: getValue(item, 'Grade_Kondisi', 'Grade Kondisi', 'Kondisi', 'Grade'),
        Battery_Health: getValue(item, 'Battery_Health', 'Battery Health', 'BH', 'Health'),
        Foto_URL: getValue(item, 'Foto_URL', 'Foto URL', 'Foto', 'Gambar', 'Image', 'URL Foto'),
        Status_Stok: getValue(item, 'Status_Stok', 'Status Stok', 'Status', 'Stok'),
      }));

      setProducts(normalizedProducts);
    }
  } catch (error) {
    console.error('Gagal mengambil data katalog:', error);
  } finally {
    setLoading(false);
  }git add .

  git commit -m "Update real-time fetch dan auto refresh"
  
  git push
};