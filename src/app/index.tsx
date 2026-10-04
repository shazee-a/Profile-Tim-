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
 *//**
 * ============================================================
 * src/app/index.tsx  —  HALAMAN UTAMA (TIDAK TERHALANG LATAR BAWAH)
 * ============================================================
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import RodaKartu from '../../components/RodaKartu';
import { WARNA } from '../../components/theme';

export default function Index() {
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
        <View style={styles.areaRoda}>
          <RodaKartu />

          {/* TEKS PETUNJUK MELAYANG (Melayang di atas roda agar tidak memotong kartu) */}
          <View style={styles.wadahPetunjuk} pointerEvents="none">
            <Text style={styles.petunjuk}>TEKAN KARTU UNTUK MELIHAT PROFIL</Text>
            <Text style={styles.kaki}>Dibuat dengan React Native + Expo</Text>
          </View>
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
    paddingBottom: 0, // Dibuat 0 agar tidak ada padding bawah yang memotong roda
  },
  areaRoda: {
    position: 'relative',
    width: '100%',
  },
  wadahPetunjuk: {
    position: 'absolute',
    bottom: 12, // Ditaruh di atas area bawah roda tanpa memblokir kartu
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  petunjuk: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: WARNA.teks,
    textShadowColor: WARNA.latar,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  kaki: {
    textAlign: 'center',
    color: WARNA.teksPudar,
    fontSize: 10,
    marginTop: 4,
  },
});