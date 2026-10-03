/**
 * ============================================================
 * theme.ts  —  WARNA & UKURAN YANG DIPAKAI BERSAMA
 * ============================================================
 * Tema "poster monokrom": abu-abu muda + hitam + satu warna
 * merah menyala sebagai aksen (mengikuti desain referensi).
 * Semua warna ada di sini, jadi kalau tim mau mengganti tema
 * cukup ubah nilai di file ini saja.
 */
export const WARNA = {
  utama: '#0B0B0B',      // hitam (teks utama, tombol, label)
  utamaGelap: '#000000', // hitam pekat
  aksen: '#FF1236',      // merah menyala (batang merah, tag, ikon)
  latar: '#DCDCDC',      // abu-abu muda (latar halaman)
  kartu: '#FFFFFF',      // putih (bingkai kartu, pop-up)
  kertas: '#FFFFFF',     // (cadangan, tidak dipakai lagi)
  teks: '#0B0B0B',       // teks utama
  teksPutih: '#FFFFFF',  // teks di atas warna gelap
  teksPudar: '#6F6F6F',  // teks keterangan
  garis: '#CFCFCF',      // abu-abu (lencana, pemisah, cincin tulisan)
};

export const UKURAN = {
  jarak: 16,   // jarak tepi halaman & antar elemen
  radius: 16,  // kelengkungan sudut standar
};