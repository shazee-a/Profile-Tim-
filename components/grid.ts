/**
 * ============================================================
 * grid.ts  —  ATURAN UKURAN GRID KARTU (WEB & HP)
 * ============================================================
 * Satu tempat untuk menghitung: berapa kolom kartu, selebar apa
 * area isi, dan selebar apa tiap kartu. Dipakai oleh index.tsx,
 * Header.tsx, dan MemberCard.tsx supaya ukurannya selalu sama.
 *
 * Aturan:
 *   - Layar sempit (HP)         : 2 kolom, isi maksimal 500 piksel
 *   - Layar lebar (web/tablet)  : 4 kolom (satu baris), isi maksimal 1100
 *
 * Untuk mengubah batas "layar lebar", ubah angka 900 di bawah.
 */
import { UKURAN } from './theme';

export const JARAK_KARTU = 12; // jarak antar kartu

export function hitungGrid(lebarLayar: number) {
  const kolom = lebarLayar >= 900 ? 4 : 2;
  const lebarMaks = kolom === 4 ? 1100 : 500;
  // lebar area isi = lebar layar dikurangi tepi kiri-kanan, tapi tidak lebih dari lebarMaks
  const lebarIsi = Math.min(lebarLayar - UKURAN.jarak * 2, lebarMaks);
  const lebarKartu = (lebarIsi - JARAK_KARTU * (kolom - 1)) / kolom;
  return { kolom, lebarIsi, lebarKartu };
}