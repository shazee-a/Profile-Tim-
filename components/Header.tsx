/**
 * ============================================================
 * Header.tsx  —  JUDUL HALAMAN DI ATAS KOLASE KERTAS ROBEK
 * ============================================================
 * Isi: nama tim (tanpa latar), tulisan miring, dan judul besar.
 * Di belakangnya ada 3 lembar kertas robek bertumpuk dengan warna
 * berbeda (cokelat muda, peach, putih). Semuanya dimulai dari
 * UJUNG KIRI LAYAR dan berakhir di tepi kanan yang robek.
 *
 * Posisi ujung kiri layar DIUKUR langsung (measureInWindow),
 * bukan dihitung dari rumus, jadi selalu pas di layar apa pun.
 *
 * Props:
 *  - namaTim  : teks kecil di atas judul (contoh: "Kelompok 5")
 *  - subJudul : tulisan miring (contoh: "Mata Kuliah")
 *  - judul    : judul besar (contoh: "Pemrograman Mobile")
 *
 * PENGATURAN (di bawah):
 *  - BAGIAN_KERTAS : kertas membentang sampai berapa bagian dari
 *    lebar kolom isi. 1 = ujung kanan kolom, 0.5 = tengah.
 *  - LAPISAN : daftar lembar kertas (warna, kemiringan, ukuran).
 *    Tambah/hapus/ubah baris untuk mengganti variasi warna.
 */
import { useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import KertasRobek from './KertasRobek';
import { WARNA } from './theme';

const BAGIAN_KERTAS = 0.92;
const NAPAS_ATAS_BAWAH = 18;  // kertas depan lebih tinggi dari teks (atas & bawah)
const LUAR_KIRI = 40;         // kertas melebar keluar layar kiri (menghindari celah saat miring)

/** Lembar kertas, dari yang PALING BELAKANG ke yang PALING DEPAN */
const LAPISAN = [
  // cokelat muda (kertas kraft), paling belakang, menyembul di kanan & bawah
  { warna: '#D8B787', serat: '#C29B66', benih: 11, miring: '2.2deg',
    tambahLebar: 40, geserAtas: 14, tambahTinggi: 6 },
  // peach/karamel muda, di tengah, menyembul di atas
  { warna: '#EDCDAA', serat: '#DDB68F', benih: 5, miring: '-2.4deg',
    tambahLebar: 18, geserAtas: -8, tambahTinggi: 4 },
  // putih kertas, paling depan, tempat teks berada
  { warna: WARNA.kertas, serat: WARNA.garis, benih: 7, miring: '-0.8deg',
    tambahLebar: 0, geserAtas: 0, tambahTinggi: 0 },
];

type HeaderProps = {
  namaTim: string;
  subJudul: string;
  judul: string;
};

export default function Header({ namaTim, subJudul, judul }: HeaderProps) {
  const wadahRef = useRef<View>(null);

  // jarak dari ujung kiri LAYAR ke tepi kiri kolom isi, dan lebar kolom isi
  const [xKolom, setXKolom] = useState(0);
  const [lebarKolom, setLebarKolom] = useState(0);
  // tinggi blok teks (supaya kertas pas mengelilingi teks)
  const [tinggiTeks, setTinggiTeks] = useState(0);

  const saatWadahDiukur = (e: LayoutChangeEvent) => {
    setLebarKolom(e.nativeEvent.layout.width);
    // measureInWindow = posisi sebenarnya di layar
    wadahRef.current?.measureInWindow((x) => {
      if (Number.isFinite(x)) setXKolom(x);
    });
  };
  const saatTeksDiukur = (e: LayoutChangeEvent) => setTinggiTeks(e.nativeEvent.layout.height);

  const siap = lebarKolom > 0 && tinggiTeks > 0;
  // lebar dasar = dari ujung kiri layar sampai sebagian kolom isi
  const lebarDasar = xKolom + lebarKolom * BAGIAN_KERTAS + LUAR_KIRI;

  return (
    <View ref={wadahRef} onLayout={saatWadahDiukur} style={styles.wadah}>
      {/* KERTAS-KERTAS (digambar lebih dulu = berada di belakang teks) */}
      {siap &&
        LAPISAN.map((l, i) => (
          <KertasRobek
            key={i}
            lebar={lebarDasar + l.tambahLebar}
            tinggi={tinggiTeks + NAPAS_ATAS_BAWAH * 2 + l.tambahTinggi}
            warna={l.warna}
            warnaSerat={l.serat}
            benih={l.benih}
            miring={l.miring}
            style={{ left: -(xKolom + LUAR_KIRI), top: -NAPAS_ATAS_BAWAH + l.geserAtas }}
          />
        ))}

      {/* TEKS JUDUL */}
      <View onLayout={saatTeksDiukur}>
        <View style={styles.barisTim}>
          <View style={styles.titik} />
          <Text style={styles.teksTim}>{namaTim}</Text>
        </View>
        <Text style={styles.subJudul}>{subJudul}</Text>
        <Text style={styles.judul}>{judul}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // marginBottom besar agar kertas tidak menempel ke "Anggota Tim" di bawahnya
  wadah: { marginTop: NAPAS_ATAS_BAWAH + 8, marginBottom: 60 },
  barisTim: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  titik: { width: 8, height: 8, borderRadius: 4, backgroundColor: WARNA.aksen, marginRight: 8 },
  teksTim: { color: WARNA.utama, fontWeight: '700', fontSize: 14 },
  subJudul: { fontSize: 24, fontStyle: 'italic', color: WARNA.aksen },
  judul: { fontSize: 38, fontWeight: '900', color: WARNA.teks, letterSpacing: 0.5, lineHeight: 44 },
});