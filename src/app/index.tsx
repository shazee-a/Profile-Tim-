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
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import RodaKartu from '../../components/RodaKartu';
import { WARNA } from '../../components/theme';

export default function Index() {
  return (
    <View style={styles.layar}>
      <ScrollView contentContainerStyle={styles.isi} showsVerticalScrollIndicator={false}>
        {/* ===== HERO ===== */}
        <Header
          sapaan={'WELCOME\nTO OUR TEAM'}
          judul="PORTFOLIO"
          kiriBawah="KELOMPOK 5"
          kananBawah="PEMROGRAMAN MOBILE"
        />

        {/* ===== RODA KARTU ANGGOTA ===== */}
        <RodaKartu />

        <Text style={styles.petunjuk}>TEKAN KARTU UNTUK MELIHAT PROFIL</Text>
        <Text style={styles.kaki}>Dibuat dengan React Native + Expo</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: WARNA.latar },
  isi: { paddingBottom: 40 },
  petunjuk: {
    textAlign: 'center', fontSize: 10, fontWeight: '800',
    letterSpacing: 2, color: WARNA.teks, marginTop: 8,
  },
  kaki: { textAlign: 'center', color: WARNA.teksPudar, fontSize: 11, marginTop: 10 },
});