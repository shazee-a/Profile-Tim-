/**
 * ============================================================
 * LatarDekorasi.tsx  —  HIASAN LATAR BELAKANG HALAMAN
 * ============================================================
 * Lingkaran-lingkaran besar dan kecil yang menghiasi latar
 * belakang halaman (di BELAKANG judul dan kartu). Hanya hiasan,
 * tidak bisa ditekan dan tidak mengganggu kartu.
 *
 * Interaktif:
 *   - Lingkaran MELAYANG naik-turun pelan tanpa henti.
 *   - Saat halaman digulir, lingkaran ikut bergeser pelan
 *     (efek parallax, lebih lambat dari isi halaman).
 *
 * Props:
 *  - scrollY : posisi gulir halaman (Animated.Value) dari index.tsx
 *
 * Cara mengubah hiasan: ubah ukuran (width/height), posisi
 * (top/left/right) atau warna di bagian `styles` paling bawah.
 */
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { WARNA } from './theme';

type Props = {
  scrollY: Animated.Value;
};

export default function LatarDekorasi({ scrollY }: Props) {
  // ---------- ANIMASI MELAYANG (berulang terus) ----------
  const melayang = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(melayang, { toValue: 1, duration: 3200, useNativeDriver: true }),
        Animated.timing(melayang, { toValue: 0, duration: 3200, useNativeDriver: true }),
      ])
    ).start();
  }, [melayang]);
  const naik = melayang.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });
  const turun = melayang.interpolate({ inputRange: [0, 1], outputRange: [0, 14] });

  // ---------- PARALLAX: bergeser pelan saat halaman digulir ----------
  const geserPelan = scrollY.interpolate({
    inputRange: [0, 600], outputRange: [0, -60], extrapolate: 'clamp',
  });
  const geserSedang = scrollY.interpolate({
    inputRange: [0, 600], outputRange: [0, -110], extrapolate: 'clamp',
  });

  return (
    // pointerEvents="none" = hiasan tidak menghalangi sentuhan ke kartu
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <Animated.View
        style={[styles.besar, { transform: [{ translateY: Animated.add(naik, geserPelan) }] }]}
      />
      <Animated.View
        style={[styles.garisKiri, { transform: [{ translateY: Animated.add(turun, geserSedang) }] }]}
      />
      <Animated.View
        style={[styles.kecil, { transform: [{ translateY: Animated.add(turun, geserPelan) }] }]}
      />
      <Animated.View
        style={[styles.sedangKiri, { transform: [{ translateY: Animated.add(naik, geserSedang) }] }]}
      />
      <Animated.View
        style={[styles.garisKanan, { transform: [{ translateY: Animated.add(naik, geserPelan) }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Lingkaran karamel besar di pojok kanan atas
  besar: {
    position: 'absolute', top: '-4%', right: -70,
    width: 230, height: 230, borderRadius: 115,
    backgroundColor: WARNA.aksen, opacity: 0.35,
  },
  // Lingkaran garis (kosong di tengah) di sisi kiri
  garisKiri: {
    position: 'absolute', top: '24%', left: -90,
    width: 210, height: 210, borderRadius: 105,
    borderWidth: 2, borderColor: WARNA.aksen, opacity: 0.4,
  },
  // Lingkaran kecil di kanan
  kecil: {
    position: 'absolute', top: '34%', right: 18,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: WARNA.aksen, opacity: 0.3,
  },
  // Lingkaran beige tua di kiri bawah
  sedangKiri: {
    position: 'absolute', top: '62%', left: -50,
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: WARNA.garis, opacity: 0.9,
  },
  // Lingkaran garis di kanan bawah
  garisKanan: {
    position: 'absolute', top: '78%', right: -80,
    width: 190, height: 190, borderRadius: 95,
    borderWidth: 2, borderColor: WARNA.aksen, opacity: 0.35,
  },
});