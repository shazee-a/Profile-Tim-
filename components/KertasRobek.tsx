/**
 * ============================================================
 * KertasRobek.tsx  —  SELEMBAR KERTAS DENGAN TEPI KANAN ROBEK
 * ============================================================
 * Satu lembar kertas berwarna dengan tepi kanan yang robek besar
 * dan tidak rata. Header.tsx menumpuk beberapa lembar dengan warna
 * berbeda sehingga terlihat seperti kolase kertas.
 *
 * Cara kerjanya (tanpa library tambahan):
 *   1. BADAN kertas = kotak biasa.
 *   2. TEPI robek   = deretan kotak yang DIPUTAR 45 derajat (belah
 *      ketupat) di sisi kanan. Ukuran dan posisinya bervariasi
 *      dan mengikuti gelombang, jadi sobekannya besar dan acak.
 *   3. Dua lapis tepi: lapis belakang = SERAT kertas (warna lebih
 *      tua), lapis depan = warna kertas.
 *   4. Seluruh lembar diputar sedikit (prop `miring`).
 *
 * Props:
 *  - lebar      : lebar kertas (tidak termasuk gerigi)
 *  - tinggi     : tinggi kertas
 *  - warna      : warna kertas
 *  - warnaSerat : warna serat di tepi robek (lebih tua dari `warna`)
 *  - benih      : angka apa saja; mengubah pola sobekan
 *  - miring     : kemiringan lembar, contoh '-1deg'
 *  - style      : posisi (left/top) yang diatur oleh Header
 *
 * MENGATUR UKURAN SOBEKAN (konstanta di bawah):
 *  - LANGKAH     : jarak antar gigi. Besar = sobekan lebih besar & kasar.
 *  - UKURAN_MIN / UKURAN_VARIASI : ukuran gigi terkecil dan selisihnya.
 */
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  lebar: number;
  tinggi: number;
  warna: string;
  warnaSerat: string;
  benih?: number;
  miring?: string;
  style?: StyleProp<ViewStyle>;
};

const LANGKAH = 24;         // jarak vertikal antar gigi (piksel)
const UKURAN_MIN = 18;      // gigi terkecil
const UKURAN_VARIASI = 24;  // gigi terbesar = UKURAN_MIN + UKURAN_VARIASI
const RUANG_GIGI = 60;      // ruang kosong di kanan badan untuk gerigi

/** Angka "acak" yang selalu sama (0 sampai 1), supaya bentuk robek tidak berubah-ubah */
const acak = (i: number, benih: number) => {
  const x = Math.sin(i * 12.9898 + benih * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type TepiProps = {
  tinggi: number;
  xBadan: number;   // posisi tepi kanan badan kertas
  warna: string;
  benih: number;
  maju: number;     // seberapa jauh gerigi menonjol ke kanan
};

/** Satu lapis tepi robek: deretan belah ketupat di sisi kanan */
function Tepi({ tinggi, xBadan, warna, benih, maju }: TepiProps) {
  const jumlah = Math.ceil(tinggi / LANGKAH) + 1;
  return (
    <>
      {Array.from({ length: jumlah }).map((_, i) => {
        const ukuran = UKURAN_MIN + acak(i, benih) * UKURAN_VARIASI;
        // gelombang besar + sedikit acak = sobekan besar yang tidak rata
        const gelombang = Math.sin(i * 0.9 + benih) * 5;
        const geser = (acak(i, benih + 1) - 0.5) * 16 + gelombang + maju;
        const pusatY = (i + 0.5) * LANGKAH;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: xBadan + geser - ukuran / 2,
              top: pusatY - ukuran / 2,
              width: ukuran,
              height: ukuran,
              backgroundColor: warna,
              transform: [{ rotate: '45deg' }],   // kotak → belah ketupat
            }}
          />
        );
      })}
    </>
  );
}

export default function KertasRobek({
  lebar, tinggi, warna, warnaSerat, benih = 1, miring = '0deg', style,
}: Props) {
  return (
    <View
      style={[
        styles.wadah,
        { width: lebar + RUANG_GIGI, height: tinggi, transform: [{ rotate: miring }] },
        style,
      ]}
    >
      {/* Lapis belakang: serat kertas (lebih tua & lebih menonjol) */}
      <Tepi tinggi={tinggi} xBadan={lebar} warna={warnaSerat} benih={benih + 2} maju={7} />

      {/* Badan kertas */}
      <View style={{ width: lebar, height: tinggi, backgroundColor: warna }} />

      {/* Lapis depan: tepi berwarna kertas */}
      <Tepi tinggi={tinggi} xBadan={lebar} warna={warna} benih={benih} maju={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  wadah: {
    position: 'absolute',
    overflow: 'hidden',   // gerigi yang melewati atas/bawah dipotong
  },
});