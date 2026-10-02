/**
 * ============================================================
 * src/app/index.tsx  —  HALAMAN UTAMA (GAYA PORTFOLIO)
 * ============================================================
 * Halaman pertama yang tampil saat aplikasi dibuka. File ini
 * hanya MENYUSUN bagian-bagian:
 *   Hiasan latar  →  judul (Header)  →  judul bagian  →  kartu 4 anggota
 *
 * Interaksi di halaman ini:
 *   - scrollY  : mencatat posisi gulir, dikirim ke LatarDekorasi
 *                agar lingkaran hiasan bergeser pelan saat digulir
 *   - FadeInUp : tiap kartu muncul satu per satu dari bawah
 *
 * Data diri TIDAK ada di sini. Data diri ada di file masing-masing
 * anggota di components/members/. Urutan kartu bisa ditukar dengan
 * memindahkan barisnya (ingat ubah angka `urutan` agar tetap 0,1,2,3).
 *
 * Catatan: alamat import memakai '../../' karena file ini ada di
 * src/app/, sedangkan folder components ada di luar src/.
 */
import { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeInUp from '../../components/FadeInUp';
import Header from '../../components/Header';
import LatarDekorasi from '../../components/LatarDekorasi';
import ProfilFadli from '../../components/members/ProfilFadli';
import ProfilShaquilla from '../../components/members/ProfilShaquilla';
import ProfilZain from '../../components/members/ProfilZain';
import ProfilZaky from '../../components/members/ProfilZaky';
import { UKURAN, WARNA } from '../../components/theme';

export default function Index() {
  // scrollY = posisi gulir halaman (0 di paling atas, makin besar ke bawah)
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.layar} edges={['top']}>
      {/* ===== HIASAN LATAR BELAKANG (diletakkan paling awal = paling belakang) ===== */}
      <LatarDekorasi scrollY={scrollY} />

      <Animated.ScrollView
        contentContainerStyle={styles.isi}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.wadah}>
          {/* ===== JUDUL ===== */}
          <Header
            namaTim="Kelompok 5"
            subJudul="Mata Kuliah"
            judul="Pemrograman Mobile"
          />

          {/* ===== JUDUL BAGIAN ===== */}
          <View style={styles.barisJudul}>
            <Text style={styles.judulBagian}>Anggota Tim</Text>
            <Text style={styles.petunjuk}>Tekan kartu untuk melihat profil</Text>
          </View>

          {/* ===== GRID KARTU (flexWrap = turun ke baris baru) ===== */}
          <View style={styles.grid}>
            <FadeInUp urutan={0}><ProfilFadli /></FadeInUp>
            <FadeInUp urutan={1}><ProfilShaquilla /></FadeInUp>
            <FadeInUp urutan={2}><ProfilZain /></FadeInUp>
            <FadeInUp urutan={3}><ProfilZaky /></FadeInUp>
          </View>

          <Text style={styles.kaki}>Dibuat dengan React Native + Expo</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: WARNA.latar },
  isi: { padding: UKURAN.jarak, paddingBottom: 40 },
  // wadah: membatasi lebar maksimal 500 agar rapi di layar web yang lebar
  wadah: { width: '100%', maxWidth: 500, alignSelf: 'center' },
  barisJudul: { marginBottom: 14 },
  judulBagian: { fontSize: 24, fontWeight: '800', color: WARNA.teks },
  petunjuk: { fontSize: 13, color: WARNA.teksPudar, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  kaki: { textAlign: 'center', color: WARNA.teksPudar, fontSize: 12, marginTop: 16 },
});
