/**
 * ============================================================
 * KertasRobek.tsx  —  SELEMBAR KERTAS DENGAN TEPI BAWAH ROBEK
 * ============================================================
 * Satu lembar kertas berwarna selebar layar. Karena kertas sudah
 * penuh dari kiri sampai kanan, bagian yang ROBEK adalah TEPI BAWAH.
 * Header.tsx menumpuk beberapa lembar dengan warna berbeda sehingga
 * terlihat seperti kolase kertas.
 *
 * Cara kerjanya (tanpa library tambahan):
 *   1. BADAN kertas = kotak biasa.
 *   2. TEPI robek   = deretan kotak yang DIPUTAR 45 derajat (belah
 *      ketupat) di sepanjang sisi bawah. Ukuran dan posisinya
 *      bervariasi dan mengikuti gelombang, jadi sobekannya besar
 *      dan tidak rata.
 *   3. Dua lapis tepi: lapis belakang = SERAT kertas (warna lebih
 *      tua), lapis depan = warna kertas.
 *   4. Seluruh lembar diputar sedikit (prop `miring`).
 *
 * Props:
 *  - lebar      : lebar kertas
 *  - tinggi     : tinggi badan kertas (tidak termasuk gerigi)
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

const LANGKAH = 26;         // jarak horizontal antar gigi (piksel)
const UKURAN_MIN = 18;      // gigi terkecil
const UKURAN_VARIASI = 26;  // gigi terbesar = UKURAN_MIN + UKURAN_VARIASI
const RUANG_GIGI = 64;      // ruang kosong di bawah badan untuk gerigi

/** Angka "acak" yang selalu sama (0 sampai 1), supaya bentuk robek tidak berubah-ubah */
const acak = (i: number, benih: number) => {
  const x = Math.sin(i * 12.9898 + benih * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type TepiProps = {
  lebar: number;
  yBadan: number;   // posisi tepi bawah badan kertas
  warna: string;
  benih: number;
  turun: number;    // seberapa jauh gerigi menonjol ke bawah
};

/** Satu lapis tepi robek: deretan belah ketupat di sisi bawah */
function Tepi({ lebar, yBadan, warna, benih, turun }: TepiProps) {
  const jumlah = Math.ceil(lebar / LANGKAH) + 1;
  return (
    <>
      {Array.from({ length: jumlah }).map((_, i) => {
        const ukuran = UKURAN_MIN + acak(i, benih) * UKURAN_VARIASI;
        // gelombang besar + sedikit acak = sobekan besar yang tidak rata
        const gelombang = Math.sin(i * 0.7 + benih) * 6;
        const geser = (acak(i, benih + 1) - 0.5) * 16 + gelombang + turun;
        const pusatX = (i + 0.5) * LANGKAH;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: pusatX - ukuran / 2,
              top: yBadan + geser - ukuran / 2,
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
        { width: lebar, height: tinggi + RUANG_GIGI, transform: [{ rotate: miring }] },
        style,
      ]}
    >
      {/* Lapis belakang: serat kertas (lebih tua & lebih menonjol) */}
      <Tepi lebar={lebar} yBadan={tinggi} warna={warnaSerat} benih={benih + 2} turun={8} />

      {/* Badan kertas */}
      <View style={{ width: lebar, height: tinggi, backgroundColor: warna }} />

      {/* Lapis depan: tepi berwarna kertas */}
      <Tepi lebar={lebar} yBadan={tinggi} warna={warna} benih={benih} turun={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  wadah: {
    position: 'absolute',
    overflow: 'hidden',   // gerigi yang melewati kiri/kanan dipotong
  },
});