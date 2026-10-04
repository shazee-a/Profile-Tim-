/**
 * ============================================================
 * Roda.tsx  —  KONFIGURASI UKURAN & GEOMETRI RODA RESPONSISF
 * ============================================================
 */

// Ubah JUMLAH_KARTU sesuai total slot kartu di roda
export const JUMLAH_KARTU = 12; 

export function ukuranRoda(lebarLayar: number) {
  const isMobile = lebarLayar < 600;

  // Di mobile, batasi lebar kartu agar pas dengan rasio layar HP (100px - 180px)
  const lebarKartu = isMobile
    ? Math.max(95, Math.min(lebarLayar * 0.28, 140))
    : Math.max(130, Math.min(lebarLayar * 0.35, 210));

  const tinggiKartu = Math.round(lebarKartu * 1.32);

  // Sudut antar dua kartu (360 derajat / 12 kartu = 30 derajat)
  const sudutAntar = 360 / JUMLAH_KARTU;

  // Jari-jari roda disesuaikan agar di HP tidak terlalu rakus tempat
  const radiusDasar = Math.round(
    (lebarKartu * 0.92) / (2 * Math.sin(((sudutAntar / 2) * Math.PI) / 180))
  );

  // Clamp radius agar di HP tidak keluar dari viewport
  const radius = isMobile 
    ? Math.min(radiusDasar, lebarLayar * 0.65) 
    : radiusDasar;

  return { lebarKartu, tinggiKartu, sudutAntar, radius };
}