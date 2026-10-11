/**
 * ============================================================
 * DekorasiKertas.tsx  —  HIASAN DI ATAS KERTAS ROBEK
 * ============================================================
 * Hiasan kecil di atas kertas (di belakang teks judul) supaya
 * kertas tidak terlihat kosong. Berisi:
 *   - SELOTIP     : potongan lakban miring seperti menempel kertas
 *   - LINGKARAN   : lingkaran garis bersusun (konsentris)
 *   - TITIK-TITIK : kumpulan titik berbaris rapi
 *   - SILANG (+)  : tanda plus kecil seperti kilau
 *   - BULATAN     : lingkaran kecil berwarna
 * Semuanya dibuat dari kotak/lingkaran biasa, tanpa library.
 *
 * Susunan menyesuaikan lebar layar:
 *   - LAYAR LEBAR (web)  : hiasan di sisi kiri dan kanan, teks
 *                          judul berada di tengah.
 *   - LAYAR SEMPIT (HP)  : hiasan hanya di sisi kanan dan pojok,
 *                          supaya tidak menabrak teks yang rata kiri.
 *
 * Props:
 *  - lebar  : lebar blok header (diukur oleh Header.tsx)
 *  - tinggi : tinggi daerah kertas yang terlihat (di atas tepi robek)
 *
 * Cara mengubah: tiap hiasan ada di bagian `return` paling bawah.
 * Ubah angka left/right/top (posisi) atau ukuran, atau hapus
 * barisnya untuk menghilangkan satu hiasan.
 */
import { StyleSheet, View, ViewStyle } from 'react-native';
import { WARNA } from './theme';

type Props = {
  lebar: number;
  tinggi: number;
};

const KRAFT = '#C29B66';
const PEACH = '#E8B98F';

/** Potongan selotip (lakban) miring */
function Selotip({ warna, derajat, style }: { warna: string; derajat: number; style: ViewStyle }) {
  return (
    <View
      style={[
        styles.selotip,
        { backgroundColor: warna, transform: [{ rotate: `${derajat}deg` }] },
        style,
      ]}
    />
  );
}

/** Lingkaran garis bersusun (2 lingkaran, satu di dalam yang lain) */
function Lingkaran({ ukuran, style }: { ukuran: number; style: ViewStyle }) {
  const dalam = ukuran * 0.55;
  return (
    <View
      style={[
        { position: 'absolute', width: ukuran, height: ukuran, borderRadius: ukuran / 2 },
        styles.garisLingkaran,
        style,
      ]}
    >
      <View
        style={[
          styles.garisLingkaran,
          {
            position: 'absolute',
            top: (ukuran - dalam) / 2 - 2, // dikurangi tebal garis luar
            left: (ukuran - dalam) / 2 - 2,
            width: dalam,
            height: dalam,
            borderRadius: dalam / 2,
          },
        ]}
      />
    </View>
  );
}

/** Kumpulan titik berbaris: `kolom` titik ke samping, `baris` titik ke bawah */
function TitikTitik({ kolom, baris, style }: { kolom: number; baris: number; style: ViewStyle }) {
  return (
    <View style={[{ position: 'absolute' }, style]}>
      {Array.from({ length: baris }).map((_, b) => (
        <View key={b} style={styles.barisTitik}>
          {Array.from({ length: kolom }).map((__, k) => (
            <View key={k} style={styles.titik} />
          ))}
        </View>
      ))}
    </View>
  );
}

/** Tanda plus (+): dua batang tipis bersilang */
function Silang({ ukuran, warna, style }: { ukuran: number; warna: string; style: ViewStyle }) {
  return (
    <View style={[{ position: 'absolute', width: ukuran, height: ukuran }, style]}>
      <View
        style={{
          position: 'absolute', left: 0, right: 0, top: ukuran / 2 - 1.5,
          height: 3, borderRadius: 2, backgroundColor: warna,
        }}
      />
      <View
        style={{
          position: 'absolute', top: 0, bottom: 0, left: ukuran / 2 - 1.5,
          width: 3, borderRadius: 2, backgroundColor: warna,
        }}
      />
    </View>
  );
}

/** Lingkaran kecil berwarna penuh */
function Bulatan({ ukuran, warna, style }: { ukuran: number; warna: string; style: ViewStyle }) {
  return (
    <View
      style={[
        { position: 'absolute', width: ukuran, height: ukuran, borderRadius: ukuran / 2, backgroundColor: warna },
        style,
      ]}
    />
  );
}

export default function DekorasiKertas({ lebar, tinggi }: Props) {
  const lebarLayar = lebar >= 900; // true = tata letak web (teks di tengah)
  const t = tinggi;                // singkatan: tinggi daerah kertas

  return (
    // pointerEvents none = hiasan tidak menghalangi sentuhan
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      {lebarLayar ? (
        <>
          {/* ============ TATA LETAK WEB: kiri & kanan teks ============ */}
          {/* Selotip di pojok atas */}
          <Selotip warna={WARNA.aksen} derajat={-18} style={{ left: lebar * 0.06, top: t * 0.12 }} />
          <Selotip warna={KRAFT} derajat={14} style={{ right: lebar * 0.06, top: t * 0.16 }} />

          {/* Lingkaran bersusun */}
          <Lingkaran ukuran={120} style={{ left: lebar * 0.07, top: t * 0.42 }} />
          <Lingkaran ukuran={150} style={{ right: lebar * 0.06, top: t * 0.4 }} />

          {/* Titik-titik */}
          <TitikTitik kolom={6} baris={4} style={{ left: lebar * 0.18, top: t * 0.2 }} />
          <TitikTitik kolom={5} baris={4} style={{ right: lebar * 0.19, top: t * 0.64 }} />

          {/* Tanda plus */}
          <Silang ukuran={22} warna={WARNA.aksen} style={{ left: lebar * 0.16, top: t * 0.62 }} />
          <Silang ukuran={14} warna={KRAFT} style={{ left: lebar * 0.04, top: t * 0.3 }} />
          <Silang ukuran={18} warna={WARNA.aksen} style={{ right: lebar * 0.17, top: t * 0.3 }} />
          <Silang ukuran={26} warna={KRAFT} style={{ right: lebar * 0.04, top: t * 0.72 }} />

          {/* Bulatan kecil */}
          <Bulatan ukuran={16} warna={PEACH} style={{ left: lebar * 0.1, top: t * 0.82 }} />
          <Bulatan ukuran={22} warna={PEACH} style={{ right: lebar * 0.12, top: t * 0.08 }} />
        </>
      ) : (
        <>
          {/* ============ TATA LETAK HP: sisi kanan & pojok ============ */}
          <Selotip warna={WARNA.aksen} derajat={38} style={{ right: -34, top: t * 0.1 }} />
          <Lingkaran ukuran={120} style={{ right: -48, top: t * 0.3 }} />
          <TitikTitik kolom={4} baris={3} style={{ right: 20, top: t * 0.72 }} />
          <Silang ukuran={16} warna={KRAFT} style={{ right: 78, top: t * 0.58 }} />
          <Silang ukuran={12} warna={WARNA.aksen} style={{ right: 28, top: t * 0.2 + 70 }} />
          <Bulatan ukuran={14} warna={PEACH} style={{ left: 14, top: t * 0.86 }} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selotip: {
    position: 'absolute',
    width: 120,
    height: 30,
    opacity: 0.5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  garisLingkaran: {
    borderWidth: 2,
    borderColor: WARNA.aksen,
    opacity: 0.55,
  },
  barisTitik: { flexDirection: 'row' },
  titik: {
    width: 5, height: 5, borderRadius: 3,
    margin: 4.5,                      // jarak antar titik
    backgroundColor: WARNA.aksen, opacity: 0.6,
  },
});