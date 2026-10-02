/**
 * ============================================================
 * Header.tsx  —  JUDUL HALAMAN DI ATAS KOLASE KERTAS ROBEK
 * ============================================================
 * Blok ini selebar LAYAR PENUH (tanpa batas samping), sehingga
 * kertas robek di belakangnya menyentuh tepi kiri dan kanan layar
 * di web maupun Android.
 *
 * Isi: nama tim, tulisan miring, dan judul besar.
 *   - LAYAR LEBAR (web) : teks berada di TENGAH dan lebih besar.
 *   - LAYAR SEMPIT (HP) : teks rata kiri, sejajar dengan kartu.
 * Di belakang teks ada 3 lembar kertas robek bertumpuk dengan
 * warna berbeda (tepi bawah yang robek), lalu hiasan kertas
 * (DekorasiKertas.tsx) supaya kertas tidak terlihat kosong.
 *
 * Di HP, bagian atas diberi jarak seukuran status bar (jam &
 * baterai) supaya tulisan tidak tertutup, sementara kertasnya
 * tetap naik sampai ke tepi atas layar.
 *
 * Props:
 *  - namaTim  : teks kecil di atas judul (contoh: "Kelompok 5")
 *  - subJudul : tulisan miring (contoh: "Mata Kuliah")
 *  - judul    : judul besar (contoh: "Pemrograman Mobile")
 *
 * PENGATURAN (di bawah): LAPISAN = daftar lembar kertas
 * (warna, kemiringan dalam derajat, seberapa jauh menyembul ke bawah).
 */
import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DekorasiKertas from './DekorasiKertas';
import { hitungGrid } from './grid';
import KertasRobek from './KertasRobek';
import { WARNA } from './theme';

const ATAS_EKSTRA = 120;   // kertas dilebihkan ke atas (terpotong tepi layar) agar tidak ada celah
const LUAR_SISI = 40;      // kertas melebar keluar layar kiri-kanan (menghindari celah saat miring)
const NAPAS_BAWAH = 26;    // jarak teks ke tepi robek kertas depan
const RUANG_GIGI = 90;     // ruang di bawah kertas untuk gerigi sobekan

/** Lembar kertas, dari yang PALING BELAKANG ke yang PALING DEPAN */
const LAPISAN = [
  // cokelat muda (kertas kraft): paling belakang, menyembul paling jauh ke bawah
  { warna: '#D8B787', serat: '#C29B66', benih: 11, derajat: 1.4, tambahBawah: 28 },
  // peach/karamel muda: di tengah
  { warna: '#EDCDAA', serat: '#DDB68F', benih: 5, derajat: -1.6, tambahBawah: 14 },
  // putih kertas: paling depan, tempat teks berada
  { warna: WARNA.kertas, serat: WARNA.garis, benih: 7, derajat: -0.6, tambahBawah: 0 },
];

type HeaderProps = {
  namaTim: string;
  subJudul: string;
  judul: string;
};

export default function Header({ namaTim, subJudul, judul }: HeaderProps) {
  const { width: lebarLayar } = useWindowDimensions();
  const insets = useSafeAreaInsets();               // tinggi status bar di HP (0 di web)
  const { lebarIsi, kolom } = hitungGrid(lebarLayar);
  const tengah = kolom >= 4;                        // true = layar lebar (web) → teks di tengah

  // ukuran blok header (diukur otomatis; berubah saat layar diputar/diubah ukurannya)
  const [ukuran, setUkuran] = useState({ w: 0, h: 0 });
  const saatDiukur = (e: LayoutChangeEvent) =>
    setUkuran({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });

  // Di layar lebar, kemiringan diperkecil agar ujung kertas tidak terlalu naik-turun
  const faktorMiring = ukuran.w > 0 ? Math.min(1, 700 / ukuran.w) : 1;

  return (
    <View
      onLayout={saatDiukur}
      style={[
        styles.wadah,
        { paddingTop: insets.top + 36, paddingBottom: RUANG_GIGI + NAPAS_BAWAH },
      ]}
    >
      {/* KERTAS-KERTAS (digambar lebih dulu = berada di belakang teks) */}
      {ukuran.w > 0 &&
        LAPISAN.map((l, i) => (
          <KertasRobek
            key={i}
            lebar={ukuran.w + LUAR_SISI * 2}
            // tepi bawah badan kertas = tinggi blok dikurangi ruang gerigi (+ tambahan per lembar)
            tinggi={ATAS_EKSTRA + ukuran.h - RUANG_GIGI + l.tambahBawah}
            warna={l.warna}
            warnaSerat={l.serat}
            benih={l.benih}
            miring={`${l.derajat * faktorMiring}deg`}
            style={{ left: -LUAR_SISI, top: -ATAS_EKSTRA }}
          />
        ))}

      {/* HIASAN DI ATAS KERTAS (di belakang teks) */}
      {ukuran.w > 0 && (
        <DekorasiKertas lebar={ukuran.w} tinggi={ukuran.h - RUANG_GIGI - 8} />
      )}

      {/* TEKS JUDUL: selebar kolom isi dan di tengah layar.
          Di layar lebar, isi teksnya juga rata tengah. */}
      <View style={{ width: lebarIsi, alignSelf: 'center', alignItems: tengah ? 'center' : 'flex-start' }}>
        <Text style={[styles.teksTim, tengah && styles.rataTengah]}>{namaTim}</Text>
        <Text style={[styles.subJudul, tengah && styles.subJudulLebar, tengah && styles.rataTengah]}>
          {subJudul}
        </Text>
        <Text style={[styles.judul, tengah && styles.judulLebar, tengah && styles.rataTengah]}>
          {judul}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // overflow hidden: kertas yang keluar dari layar/atas dipotong rapi
  wadah: { width: '100%', overflow: 'hidden', marginBottom: 8 },
  rataTengah: { textAlign: 'center' },
  teksTim: { color: WARNA.utama, fontWeight: '700', fontSize: 14, marginBottom: 14 },
  subJudul: { fontSize: 24, fontStyle: 'italic', color: WARNA.aksen },
  subJudulLebar: { fontSize: 28 },
  judul: { fontSize: 38, fontWeight: '900', color: WARNA.teks, letterSpacing: 0.5, lineHeight: 44 },
  judulLebar: { fontSize: 54, lineHeight: 62 },
});