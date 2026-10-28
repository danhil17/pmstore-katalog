export type StoreLink = {
  label: string;
  href: string;
};

export type StoreInfo = {
  name: string;
  shortName: string;
  location: string;
  description: string;
  address: string | null;
  hours: string | null;
  phone: string | null;
  email: string | null;
  contactUrl: string | null;
  socials: StoreLink[];
};

/**
 * Informasi bisnis yang boleh ditampilkan ke publik.
 * Kosongkan field yang belum terverifikasi — jangan mengisi dummy.
 */
export const store: StoreInfo = {
  name: "PM STORE",
  shortName: "PM",
  location: "Lumajang",
  description:
    "PM STORE adalah toko gadget di Lumajang. Pengunjung dapat mencari produk, melihat detail, lalu menghubungi admin untuk ketersediaan dan konsultasi.",
  address: null,
  hours: null,
  phone: null,
  email: null,
  contactUrl: null,
  socials: [],
};

export const siteMeta = {
  title: "PM STORE — Katalog Gadget Lumajang",
  description:
    "Jelajahi katalog gadget PM STORE di Lumajang. Cek detail produk, lalu konsultasikan pilihanmu dengan admin.",
};
