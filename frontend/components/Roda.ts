/**
 * ============================================================
 * components/Roda.ts — KARTU & RODA SEIMBANG (PROPORSIONAL)
 * ============================================================
 */
export const JUMLAH_KARTU = 12;

export function ukuranRoda(lebarLayar: number) {
  const isMobile = lebarLayar <= 450;
  const isTablet = lebarLayar <= 758;

  let lebarKartu: number;
  let radius: number;

  if (isMobile) {
    // Mobile (<= 450px)
    lebarKartu = Math.max(85, Math.min(lebarLayar * 0.26, 110));
    radius = Math.min(lebarKartu * 1.9, lebarLayar * 0.44);
  } else if (isTablet) {
    // Tablet (<= 758px)
    lebarKartu = Math.max(120, Math.min(lebarLayar * 0.20, 145));
    radius = Math.min(lebarKartu * 2.0, 270);
  } else {
    // Desktop / Monitor Layar Lebar (> 758px)
    // Diatur pas agar kartu terlihat jelas & tidak memotong header
    lebarKartu = Math.max(140, Math.min(lebarLayar * 0.12, 175));
    radius = Math.min(lebarKartu * 2.1, 330);
  }

  const tinggiKartu = Math.round(lebarKartu * 1.35);
  const sudutAntar = 360 / JUMLAH_KARTU;

  return { lebarKartu, tinggiKartu, sudutAntar, radius, isMobile, isTablet };
}