/**
 * ============================================================
 * roda.ts  —  ATURAN UKURAN RODA KARTU
 * ============================================================
 * Satu tempat untuk menghitung ukuran kartu dan jari-jari roda
 * dari lebar layar. Dipakai oleh RodaKartu.tsx (susunan roda)
 * dan MemberCard.tsx (ukuran tiap kartu) supaya selalu cocok.
 *
 * Konsep "looping": anggota tim hanya 4 orang, tapi roda berisi
 * JUMLAH_KARTU kartu (default 12 = 4 anggota diulang 3 kali).
 * Jadi lingkaran roda penuh terisi dan tidak ada ruang kosong.
 * Ubah JUMLAH_KARTU menjadi kelipatan 4 (8, 12, 16, 20) untuk
 * membuat kartu lebih jarang atau lebih rapat.
 */
export const JUMLAH_KARTU = 12;

export function ukuranRoda(lebarLayar: number) {
  // lebar kartu = 40% lebar layar, dibatasi 130 sampai 230 piksel
  const lebarKartu = Math.max(130, Math.min(lebarLayar * 0.4, 230));
  const tinggiKartu = Math.round(lebarKartu * 1.32);
  // sudut antar dua kartu bersebelahan (360 derajat dibagi jumlah kartu)
  const sudutAntar = 360 / JUMLAH_KARTU;
  // jari-jari roda dihitung agar jarak antar kartu di sisi DALAM (dekat pusat
  // roda, tempat bilah nama berada) = 92% lebar kartu. Dengan begitu kartu
  // tetangga hanya sedikit bersinggungan dan nama tidak tertutup, sedangkan
  // sisi luar kartu terbuka seperti kipas.
  const radius = Math.round(
    (lebarKartu * 0.92) / (2 * Math.sin(((sudutAntar / 2) * Math.PI) / 180)) + tinggiKartu / 2
  );
  return { lebarKartu, tinggiKartu, sudutAntar, radius };
}