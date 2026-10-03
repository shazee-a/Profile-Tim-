/**
 * ============================================================
 * Header.tsx  —  HERO GAYA POSTER (JUDUL RAKSASA + BATANG MERAH)
 * ============================================================
 * Mengikuti desain referensi:
 *   - kiri atas  : sapaan kecil huruf kapital ("WELCOME TO OUR TEAM")
 *   - kanan atas : logo bulat kecil
 *   - tengah     : JUDUL RAKSASA, dengan batang merah tegak di
 *                  belakangnya dan "bayangan" judul yang bergeser
 *                  kiri-kanan pelan (animasi)
 *   - bawah      : dua teks kecil (kiri dan kanan)
 *   - tanda "+"  : penanda kecil di sudut seperti garis bantu poster
 *
 * Ukuran judul menyesuaikan lebar layar (web maupun HP).
 * Di HP, bagian atas diberi jarak seukuran status bar.
 *
 * Props:
 *  - sapaan    : teks kecil kiri atas (boleh 2 baris, pakai \n)
 *  - judul     : judul raksasa (contoh: "PORTFOLIO")
 *  - kiriBawah : teks kecil kiri bawah (contoh: "KELOMPOK 5")
 *  - kananBawah: teks kecil kanan bawah (contoh: "PEMROGRAMAN MOBILE")
 */
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UKURAN, WARNA } from './theme';

type HeaderProps = {
  sapaan: string;
  judul: string;
  kiriBawah: string;
  kananBawah: string;
};

export default function Header({ sapaan, judul, kiriBawah, kananBawah }: HeaderProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();               // tinggi status bar di HP (0 di web)

  // lebar area isi dan ukuran judul (dibatasi agar tidak terlalu raksasa di web)
  const lebarIsi = Math.min(width - UKURAN.jarak * 2, 1100);
  const ukuranJudul = Math.min(lebarIsi / 7.2, 150);
  const tinggiJudul = ukuranJudul * 1.1;

  // ---------- ANIMASI "BAYANGAN" JUDUL (bergeser kiri-kanan) ----------
  const geser = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animasi = Animated.loop(
      Animated.sequence([
        Animated.timing(geser, { toValue: 1, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(geser, { toValue: 0, duration: 2400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    animasi.start();
    return () => animasi.stop();
  }, [geser]);
  const geserX = geser.interpolate({
    inputRange: [0, 1],
    outputRange: [-ukuranJudul * 0.09, ukuranJudul * 0.09],
  });

  // gaya teks judul (dipakai oleh judul utama dan bayangannya)
  const gayaJudul = {
    fontSize: ukuranJudul,
    lineHeight: tinggiJudul,
    letterSpacing: ukuranJudul * 0.01,
  };

  return (
    <View style={[styles.wadah, { paddingTop: insets.top + 20 }]}>
      <View style={{ width: lebarIsi, alignSelf: 'center' }}>
        {/* ----- TANDA "+" di sudut atas ----- */}
        <Text style={[styles.plus, { left: 0, top: 0 }]}>+</Text>
        <Text style={[styles.plus, { left: '32%', top: 0 }]}>+</Text>
        <Text style={[styles.plus, { right: 0, top: 0 }]}>+</Text>

        {/* ----- BARIS ATAS: sapaan + logo ----- */}
        <View style={styles.barisAtas}>
          <Text style={styles.sapaan}>{sapaan}</Text>
          {/* Logo bulat: cincin hitam + titik di tengah */}
          <View style={styles.logoLuar}>
            <View style={styles.logoDalam} />
          </View>
        </View>

        {/* ----- JUDUL RAKSASA ----- */}
        <View style={[styles.areaJudul, { height: tinggiJudul }]}>
          {/* Batang merah tegak di belakang judul */}
          <View
            style={[
              styles.batang,
              { width: lebarIsi * 0.17, height: tinggiJudul + 84, top: -42, left: lebarIsi * 0.415 },
            ]}
          />
          {/* "Bayangan" judul yang bergeser */}
          <Animated.Text
            numberOfLines={1}
            style={[styles.judul, gayaJudul, styles.bayangan, { transform: [{ translateX: geserX }, { scaleY: 0.8 }] }]}
          >
            {judul}
          </Animated.Text>
          {/* Judul utama */}
          <Text numberOfLines={1} style={[styles.judul, gayaJudul]}>
            {judul}
          </Text>
        </View>

        {/* ----- BARIS BAWAH: dua teks kecil ----- */}
        <View style={styles.barisBawah}>
          <Text style={styles.kecil}>{kiriBawah}</Text>
          <Text style={styles.kecil}>{kananBawah}</Text>
        </View>

        {/* ----- TANDA "+" di sudut bawah ----- */}
        <Text style={[styles.plus, { left: 0, bottom: 0 }]}>+</Text>
        <Text style={[styles.plus, { left: '32%', bottom: 0 }]}>+</Text>
        <Text style={[styles.plus, { right: 0, bottom: 0 }]}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wadah: { width: '100%', backgroundColor: WARNA.latar, paddingBottom: 18 },
  plus: { position: 'absolute', fontSize: 14, color: WARNA.teks, fontWeight: '300' },
  barisAtas: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    marginTop: 26,
  },
  sapaan: { fontSize: 13, fontWeight: '900', letterSpacing: 2, color: WARNA.teks, lineHeight: 17 },
  logoLuar: {
    width: 30, height: 30, borderRadius: 15, borderWidth: 3, borderColor: WARNA.teks,
    alignItems: 'center', justifyContent: 'center',
  },
  logoDalam: { width: 10, height: 10, borderRadius: 5, backgroundColor: WARNA.teks },
  areaJudul: { marginTop: 56, marginBottom: 56, justifyContent: 'center' },
  batang: { position: 'absolute', backgroundColor: WARNA.aksen },
  judul: { fontWeight: '900', color: WARNA.teks, textAlign: 'center' },
  bayangan: { position: 'absolute', left: 0, right: 0, top: 6, opacity: 0.16 },
  barisBawah: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  kecil: { fontSize: 10, fontWeight: '800', letterSpacing: 2, color: WARNA.teks },
});