/**
 * ============================================================
 * src/app/index.tsx  —  HALAMAN UTAMA (GAYA PORTFOLIO)
 * ============================================================
 * Halaman pertama yang tampil saat aplikasi dibuka. File ini
 * hanya MENYUSUN bagian-bagian:
 *   Hiasan latar  →  Header (kertas robek)  →  judul bagian  →  kartu
 *
 * Tata letak:
 *   - Header dibuat SELEBAR LAYAR (agar kertasnya penuh).
 *   - Judul bagian + kartu berada di dalam kolom berlebar `lebarIsi`
 *     (dihitung grid.ts): 2 kolom di HP, 4 kolom di layar lebar.
 *
 * Interaksi di halaman ini:
 *   - scrollY  : mencatat posisi gulir, dikirim ke LatarDekorasi
 *   - FadeInUp : tiap kartu muncul satu per satu dari bawah
 *
 * Data diri TIDAK ada di sini. Data diri ada di file masing-masing
 * anggota di components/members/.
 *
 * Catatan: alamat import memakai '../../' karena file ini ada di
 * src/app/, sedangkan folder components ada di luar src/.
 */
import { useRef } from 'react';
import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import FadeInUp from '../../components/FadeInUp';
import { hitungGrid } from '../../components/grid';
import Header from '../../components/Header';
import LatarDekorasi from '../../components/LatarDekorasi';
import ProfilFadli from '../../components/members/ProfilFadli';
import ProfilShaquilla from '../../components/members/ProfilShaquilla';
import ProfilZain from '../../components/members/ProfilZain';
import ProfilZaky from '../../components/members/ProfilZaky';
import { WARNA } from '../../components/theme';

export default function Index() {
  // scrollY = posisi gulir halaman (0 di paling atas, makin besar ke bawah)
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const { lebarIsi } = hitungGrid(width);

  return (
    // View biasa (bukan SafeAreaView) agar kertas Header bisa sampai ke tepi atas layar.
    // Jarak status bar di HP ditangani oleh Header.tsx.
    <View style={styles.layar}>
      {/* ===== HIASAN LATAR BELAKANG (paling awal = paling belakang) ===== */}
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
        {/* ===== JUDUL (selebar layar) ===== */}
        <Header
          namaTim="Kelompok 5"
          subJudul="Mata Kuliah"
          judul="Pemrograman Mobile"
        />

        {/* ===== KOLOM ISI (rata tengah) ===== */}
        <View style={{ width: lebarIsi, alignSelf: 'center' }}>
          <View style={styles.barisJudul}>
            <Text style={styles.judulBagian}>Anggota Tim</Text>
            <Text style={styles.petunjuk}>Tekan kartu untuk melihat profil</Text>
          </View>

          {/* Grid kartu (flexWrap = turun ke baris baru bila tidak muat) */}
          <View style={styles.grid}>
            <FadeInUp urutan={0}><ProfilFadli /></FadeInUp>
            <FadeInUp urutan={1}><ProfilShaquilla /></FadeInUp>
            <FadeInUp urutan={2}><ProfilZain /></FadeInUp>
            <FadeInUp urutan={3}><ProfilZaky /></FadeInUp>
          </View>

          <Text style={styles.kaki}>Dibuat dengan React Native + Expo</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: WARNA.latar },
  isi: { paddingBottom: 40 },
  barisJudul: { marginTop: 8, marginBottom: 14 },
  judulBagian: { fontSize: 24, fontWeight: '800', color: WARNA.teks },
  petunjuk: { fontSize: 13, color: WARNA.teksPudar, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  kaki: { textAlign: 'center', color: WARNA.teksPudar, fontSize: 12, marginTop: 16 },
});