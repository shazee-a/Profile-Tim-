/**
 * ============================================================
 * MemberCard.tsx  —  KARTU ANGGOTA UNTUK RODA
 * ============================================================
 * Kartu bergaya poster: foto memenuhi kartu, bingkai putih, tag
 * merah "↗" di pojok, dan bilah hitam di bawah berisi NAMA dan
 * PERAN (dengan ikon). Kartu ini ditaruh di roda oleh
 * RodaKartu.tsx; menekannya membuka pop-up profil.
 *
 * IKON PERAN dipilih otomatis dari tulisan peran:
 *   - mengandung "backend"  → ikon server
 *   - mengandung "frontend" → ikon jendela browser
 *   - selain itu            → ikon orang
 *
 * Props (sama seperti sebelumnya, file anggota tidak perlu diubah):
 *  - foto    : gambar (hasil require('...'))
 *  - nama    : nama anggota
 *  - peran   : jabatan/peran di tim
 *  - onPress : fungsi yang dijalankan saat kartu ditekan
 *
 * Ukuran kartu dihitung oleh roda.ts.
 */
import { Ionicons } from '@expo/vector-icons';
import {
  Image, ImageSourcePropType, Pressable, StyleSheet,
  Text, useWindowDimensions, View,
} from 'react-native';
import { ukuranRoda } from './Roda';
import { WARNA } from './theme';

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

export default function MemberCard({ foto, nama, peran, onPress }: MemberCardProps) {
  const { width } = useWindowDimensions();
  const { lebarKartu, tinggiKartu } = ukuranRoda(width);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.kartu,
        { width: lebarKartu, height: tinggiKartu },
        pressed && { opacity: 0.85 },
      ]}
    >
      {/* FOTO memenuhi seluruh kartu */}
      <Image source={foto} resizeMode="cover" style={StyleSheet.absoluteFill} />

      {/* TAG MERAH di pojok kanan atas (petunjuk bahwa kartu bisa ditekan) */}
      <View style={styles.tag}>
        <Text style={styles.teksTag}>↗</Text>
      </View>

      {/* BILAH HITAM di bawah: nama + peran */}
      <View style={styles.bilah}>
        <Text style={[styles.nama, { fontSize: lebarKartu * 0.1 }]} numberOfLines={1}>
          {nama.toUpperCase()}
        </Text>
        <View style={styles.barisPeran}>
          <Ionicons name={pilihIkon(peran)} size={13} color={WARNA.aksen} />
          <Text style={styles.teksPeran} numberOfLines={1}>{peran}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kartu: {
    borderRadius: 18,
    overflow: 'hidden',            // foto mengikuti sudut membulat
    borderWidth: 3,
    borderColor: WARNA.kartu,      // bingkai putih
    backgroundColor: WARNA.garis,
    elevation: 6,                  // bayangan di Android
  },
  tag: {
    position: 'absolute', top: 8, right: 8,
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: WARNA.aksen,
    alignItems: 'center', justifyContent: 'center',
  },
  teksTag: { color: WARNA.teksPutih, fontWeight: '900', fontSize: 14 },
  bilah: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(11,11,11,0.78)',
    paddingVertical: 8, paddingHorizontal: 10,
  },
  nama: { color: WARNA.teksPutih, fontWeight: '900', letterSpacing: 1 },
  barisPeran: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  teksPeran: { flexShrink: 1, color: '#DADADA', fontSize: 11, fontWeight: '600' },
});