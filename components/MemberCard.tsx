/**
 * ============================================================
 * MemberCard.tsx  —  KARTU ANGGOTA GAYA PORTFOLIO
 * ============================================================
 * Satu kartu = foto (persegi panjang bersudut membulat) + nama
 * + peran dengan IKON di sampingnya + tombol "Lihat Profil".
 * Komponen ini hanya "cetakan"; isinya dikirim dari file milik
 * tiap anggota di components/members/.
 *
 * IKON PERAN dipilih otomatis dari tulisan peran:
 *   - mengandung "backend"  → ikon server
 *   - mengandung "frontend" → ikon jendela browser
 *   - selain itu            → ikon orang
 * Jadi cukup isi `peran: 'Backend Developer'` di file anggota.
 *
 * Interaktif: saat kartu ditekan, kartu mengecil sedikit lalu
 * memantul kembali (animasi pegas) sebelum pop-up terbuka.
 *
 * Props:
 *  - foto    : gambar (hasil require('...'))
 *  - nama    : nama anggota
 *  - peran   : jabatan/peran di tim
 *  - onPress : fungsi yang dijalankan saat kartu/tombol ditekan
 */
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
  Animated, Image, ImageSourcePropType, Pressable,
  StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { UKURAN, WARNA } from './theme';

type MemberCardProps = {
  foto: ImageSourcePropType;
  nama: string;
  peran: string;
  onPress: () => void;
};

type NamaIkon = keyof typeof Ionicons.glyphMap;

/** Memilih ikon berdasarkan tulisan peran */
function pilihIkon(peran: string): NamaIkon {
  const p = peran.toLowerCase().replace(/[-\s]/g, ''); // "Back-end" → "backend"
  if (p.includes('backend')) return 'server-outline';
  if (p.includes('frontend')) return 'browsers-outline';
  return 'person-outline';
}

const JARAK_KARTU = 12; // jarak antar dua kartu dalam satu baris

export default function MemberCard({ foto, nama, peran, onPress }: MemberCardProps) {
  // ---------- UKURAN (angka pasti, dihitung dari lebar layar) ----------
  // Lebar area isi = lebar layar dikurangi tepi kiri-kanan, maksimal 500
  // (sama dengan wadah di src/app/index.tsx, supaya kartu pas memenuhi baris).
  const { width } = useWindowDimensions();
  const lebarIsi = Math.min(width - UKURAN.jarak * 2, 500);
  const lebarKartu = (lebarIsi - JARAK_KARTU) / 2;
  const lebarFoto = lebarKartu - 16;      // dikurangi padding kartu (8 x 2)
  const tinggiFoto = lebarFoto * 1.25;    // perbandingan 4:5

  // ---------- ANIMASI TEKAN (mengecil lalu memantul) ----------
  const skala = useRef(new Animated.Value(1)).current;
  const animasi = (ke: number) =>
    Animated.spring(skala, { toValue: ke, friction: 6, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.kartu, { width: lebarKartu, transform: [{ scale: skala }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animasi(0.95)}
        onPressOut={() => animasi(1)}
      >
        {/* BAGIAN 1: FOTO */}
        <Image
          source={foto}
          resizeMode="cover"
          style={[styles.foto, { width: lebarFoto, height: tinggiFoto }]}
        />

        {/* BAGIAN 2: NAMA */}
        <Text style={styles.nama} numberOfLines={1}>{nama}</Text>

        {/* BAGIAN 3: PERAN = ikon + teks (tanpa latar) */}
        <View style={styles.barisPeran}>
          <Ionicons name={pilihIkon(peran)} size={15} color={WARNA.aksen} />
          <Text style={styles.teksPeran} numberOfLines={1}>{peran}</Text>
        </View>

        {/* BAGIAN 4: TOMBOL */}
        <View style={styles.tombol}>
          <Text style={styles.teksTombol}>Lihat Profil  ↗</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  kartu: {
    backgroundColor: WARNA.kartu,
    borderRadius: 24,
    padding: 8,
    marginBottom: JARAK_KARTU,
    // bayangan lembut (iOS pakai shadow*, Android pakai elevation)
    shadowColor: WARNA.utama,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  foto: {
    borderRadius: 16,                 // sudut membulat biasa
    backgroundColor: WARNA.garis,
  },
  nama: {
    fontSize: 16, fontWeight: '800', color: WARNA.teks,
    marginTop: 10, paddingHorizontal: 4,
  },
  barisPeran: {
    flexDirection: 'row',             // ikon di KIRI, teks di KANAN
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  teksPeran: { flexShrink: 1, fontSize: 12, color: WARNA.teksPudar, fontWeight: '600' },
  tombol: {
    backgroundColor: WARNA.utama,
    paddingVertical: 9, borderRadius: 20,
    alignItems: 'center', marginTop: 10,
  },
  teksTombol: { color: WARNA.teksPutih, fontWeight: '700', fontSize: 12 },
});