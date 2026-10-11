/**
 * ============================================================
 * skala.ts  —  SKALA POSTER: SELURUH TAMPILAN PAS DI LAYAR
 * ============================================================
 * (Bukan _layout.tsx. Ini file baru, letaknya di folder components.)
 *
 * Tujuan: halaman selalu PAS memenuhi layar (lebar dan tinggi), di
 * zoom in maupun zoom out, di web maupun HP, seperti poster yang
 * diperbesar atau diperkecil.
 *
 * Cara kerja: tampilan dirancang pada satu ukuran acuan
 *   - layar lebar (web)  : 1280 x 720
 *   - HP                 :  390 x 800
 * lalu semua ukuran (huruf, jarak, judul, kartu, roda) dikalikan
 * satu angka skala `u`:
 *      u = lebar layar / lebar acuan      (kalau lebar yang membatasi)
 *      u = tinggi layar / tinggi acuan    (kalau tinggi yang membatasi)
 * Yang diambil adalah yang LEBIH KECIL, sehingga seluruh isi muat.
 * Saat browser di-zoom, lebar dan tinggi layar (dalam piksel CSS)
 * berubah bersamaan, jadi `u` ikut berubah dan susunannya tetap sama.
 *
 * Kalau layar terlalu pendek sampai huruf menjadi sangat kecil (di
 * bawah u_min), skala dikunci di u_min dan halaman bisa digulir.
 *
 * Yang dikembalikan hitungSkala(lebarLayar, tinggiLayar):
 *  - lebar    : true = layar lebar (web/tablet), false = HP
 *  - u        : skala semua ukuran
 *  - lebarIsi : lebar area isi (untuk judul), sudah dikali skala
 */
import { useWindowDimensions } from 'react-native';

export const BATAS_LEBAR = 900; // lebar layar mulai dari ini = tampilan layar lebar

const RANCANGAN = {
  lebar: { w: 1280, h: 720, uMin: 0.6, tepi: 50 },
  hp: { w: 390, h: 800, uMin: 0.8, tepi: 16 },
};

export function hitungSkala(lebarLayar: number, tinggiLayar: number) {
  // layar lebar = lebar >= 900, ATAU landscape (lebar minimal 1,4 kali tinggi), misalnya HP diputar
  const lebar = lebarLayar >= BATAS_LEBAR || lebarLayar / tinggiLayar >= 1.4;
  const r = lebar ? RANCANGAN.lebar : RANCANGAN.hp;
  const uLebar = lebarLayar / r.w;
  const uTinggi = tinggiLayar / r.h;
  // lebar tidak boleh dilewati; tinggi boleh dilewati hanya jika huruf terlalu kecil (uMin)
  const u = Math.min(uLebar, Math.max(uTinggi, r.uMin));
  const lebarIsi = Math.min(lebarLayar - 2 * r.tepi * u, (r.w - 2 * r.tepi) * u);
  return { lebar, u, lebarIsi };
}

/** Versi hook: otomatis ikut berubah saat jendela diubah ukurannya / di-zoom */
export function useSkala() {
  const { width, height } = useWindowDimensions();
  return hitungSkala(width, height);
}