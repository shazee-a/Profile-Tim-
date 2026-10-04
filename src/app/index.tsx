/**
 * ============================================================
 * src/app/index.tsx  —  HALAMAN UTAMA (GAYA POSTER PORTFOLIO)
 * ============================================================
 * Halaman pertama yang tampil saat aplikasi dibuka. File ini
 * hanya MENYUSUN bagian-bagian:
 *   Header (hero poster)  →  RodaKartu (kartu anggota berputar)
 *
 * Teks hero bisa diubah langsung di <Header ... /> di bawah.
 * Data diri TIDAK ada di sini. Data diri ada di file masing-masing
 * anggota di components/members/.
 *
 * Catatan: alamat import memakai '../../' karena file ini ada di
 * src/app/, sedangkan folder components ada di luar src/.
 /**
 * ============================================================
 * src/app/index.tsx  —  HALAMAN UTAMA RESPONSIF TANPA PADDING BAWAH
 * ============================================================
 */
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Header from '../../components/Header';
import RodaKartu from '../../components/RodaKartu';
import { WARNA } from '../../components/theme';

export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  // Helper skala teks responsif berdasarkan lebar layar
  const skalaTeks = (ukuran: number) => {
    const rasio = width / 375; // Standard Mobile Baseline (375px)
    const hasil = Math.round(ukuran * rasio);
    return Math.max(Math.min(hasil, ukuran * 1.4), ukuran * 0.75);
  };

  return (
    <View style={styles.layar}>
      <ScrollView
        contentContainerStyle={styles.isi}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ===== HERO ===== */}
        <Header
          sapaan={'WELCOME\nTO OUR TEAM'}
          judul="PORTFOLIO"
          kiriBawah="KELOMPOK 5"
          kananBawah="PEMROGRAMAN MOBILE"
        />

        {/* ===== RODA KARTU ANGGOTA ===== */}
        {  /* menurunkan tTEKAN KARTU UNTUK MELIHAT PROFIL dan Dibuat dengan React Native + Expo */}

        <View style={styles.areaRoda}>
          <RodaKartu />
        </View>

        {/* ===== TEKS PETUNJUK FOOTER FLEKSIBEL ===== */}
        <View style={[styles.wadahPetunjuk, { marginTop: isMobile ? 5 : 3 }]}>
          <Text
            style={[
              styles.petunjuk,
              {
                fontSize: skalaTeks(10),
                letterSpacing: isMobile ? 1 : 1,
                marginTop: isMobile ? 0 : 1,
              },
            ]}
            numberOfLines={1}
          >
            TEKAN KARTU UNTUK MELIHAT PROFIL
          </Text>
          <Text
            style={[
              styles.kaki,
              {
                fontSize: skalaTeks(8.5),
                marginTop: isMobile ? 0 : 1,
              },
            ]}
            numberOfLines={1}
          >
            Dibuat dengan React Native + Expo
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layar: {
    flex: 1,
    backgroundColor: WARNA.latar,
  },
  isi: {
    paddingBottom: 0, // Dibuat minimal hanya untuk ruang batas aman teks footer
    padding: 0,
  },
  areaRoda: {
    width: '100%',
    alignItems: 'center',
  },
  wadahPetunjuk: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: 0,
    zIndex: 30,
  },
  petunjuk: {
    textAlign: 'center',
    fontWeight: '800',
    color: WARNA.teks,
  },
  kaki: {
    textAlign: 'center',
    color: WARNA.teksPudar,
    fontWeight: '500',
  },
});