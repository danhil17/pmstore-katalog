'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Battery, PhoneCall, Sparkles } from 'lucide-react';

interface ProductRaw {
  [key: string]: any;
}

interface Product {
  Nama_Produk: string;
  Harga: string;
  Kategori: string;
  Garansi: string;
  Grade_Kondisi: string;
  Battery_Health: string;
  Foto_URL: string;
  Status_Stok: string;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const NO_WHATSAPP = '628123450429';

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pembaca nama kolom fleksibel (Otomatis cocokkan spasi/huruf besar-kecil)
  const getValue = (item: ProductRaw, ...possibleKeys: string[]): string => {
    for (const key of possibleKeys) {
      if (item[key] !== undefined && item[key] !== null && item[key] !== '') {
        return String(item[key]);
      }
    }
    const itemKeys = Object.keys(item);
    for (const key of possibleKeys) {
      const target = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchedKey = itemKeys.find(
        (k) => k.toLowerCase().replace(/[^a-z0-9]/g, '') === target
      );
      if (matchedKey && item[matchedKey] !== undefined && item[matchedKey] !== null) {
        return String(item[matchedKey]);
      }
    }
    return '';
  };

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_SHEETDB_URL;
      if (!apiUrl) return;

      const res = await fetch(`${apiUrl}?sheet=KATALOG_WEBSITE`);
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
    }
  };

  const categories = ['Semua', 'iPhone', 'MacBook', 'iPad', 'Accessories'];

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.Nama_Produk?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'Semua' ||
      item.Kategori?.toLowerCase() === selectedCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  const formatRupiah = (harga: string) => {
    const numeric = parseInt(harga?.replace(/[^0-9]/g, '') || '0', 10);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(numeric);
  };

  const handleWAOrder = (product: Product) => {
    const pesan =
      `Halo PM Store, saya mau order unit ini:\n\n` +
      `📌 *${product.Nama_Produk || 'Produk PM Store'}*\n` +
      `💰 *Harga:* ${formatRupiah(product.Harga)}\n` +
      `🛡️ *Garansi:* ${product.Garansi || '-'}\n` +
      `🔋 *BH:* ${product.Battery_Health || '-'}\n` +
      `✨ *Kondisi:* ${product.Grade_Kondisi || '-'}\n\n` +
      `Apakah unit ini masih ready?`;

    window.open(`https://wa.me/${NO_WHATSAPP}?text=${encodeURIComponent(pesan)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans antialiased">
      {/* Navbar Premium iBox Style */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              PM STORE
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase bg-black text-white px-2 py-0.5 rounded-full">
              Official
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs sm:max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari iPhone, iPad, MacBook..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#f5f5f7] pl-9 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-black text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Katalog Stok Real-Time
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Temukan Gadget Impianmu.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Unit Original, Bergaransi Resmi, dan Kualitas Terjamin 100%.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 h-80 animate-pulse border border-black/5"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5 mt-6">
            <p className="text-gray-500 font-medium">Unit belum tersedia atau stok habis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-4 flex flex-col justify-between border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Image Holder */}
                  <div className="w-full h-44 sm:h-52 bg-[#f5f5f7] rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2 relative">
                    {product.Foto_URL ? (
                      <img
                        src={product.Foto_URL}
                        alt={product.Nama_Produk || 'Foto Produk'}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">No Image Available</span>
                    )}

                    {/* Status Badge */}
                    {product.Status_Stok && (
                      <span
                        className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          product.Status_Stok.toLowerCase() === 'ready'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {product.Status_Stok}
                      </span>
                    )}
                  </div>

                  {/* Badges Info */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.Garansi && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3" />
                        {product.Garansi}
                      </span>
                    )}
                    {product.Battery_Health && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                        <Battery className="w-3 h-3" />
                        BH {product.Battery_Health}
                      </span>
                    )}
                    {product.Grade_Kondisi && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md">
                        <Sparkles className="w-3 h-3" />
                        {product.Grade_Kondisi}
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 leading-snug">
                    {product.Nama_Produk || 'Nama Produk Belum Diisi'}
                  </h3>
                  <p className="text-base sm:text-lg font-extrabold text-black mt-1">
                    {formatRupiah(product.Harga)}
                  </p>
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={() => handleWAOrder(product)}
                  className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-medium text-xs sm:text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Beli via WhatsApp
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Minimalis */}
      <footer className="bg-white border-t border-black/5 mt-16 py-8 text-center text-xs text-gray-500">
        <p>© 2026 PM Store. All rights reserved. Premium Apple Store Partner.</p>
      </footer>
    </div>
  );
}