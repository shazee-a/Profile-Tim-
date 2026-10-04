/**
 * ============================================================
 * RodaKartu.tsx  —  RODA KARTU SETENGAH LINGKARAN DENGAN SPACING RESPONSIF
 * ============================================================
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import ProfilFadli from './members/ProfilFadli';
import ProfilShaquilla from './members/ProfilShaquilla';
import ProfilZain from './members/ProfilZain';
import ProfilZaky from './members/ProfilZaky';
import { JUMLAH_KARTU, ukuranRoda } from './Roda';
import { WARNA } from './theme';

const DURASI = 50000;
const POLA_TULISAN = 'TIM PORTFOLIO  •  ';

const ANGGOTA = [
  { nama: 'Fadli', Komponen: ProfilFadli },
  { nama: 'Zain', Komponen: ProfilZain },
  { nama: 'Zaky', Komponen: ProfilZaky },
  { nama: 'Shaquilla', Komponen: ProfilShaquilla },
];

const keRadian = (derajat: number) => (derajat * Math.PI) / 180;

export default function RodaKartu() {
  const { width: lebarLayar } = useWindowDimensions();
  const { lebarKartu, tinggiKartu, sudutAntar, radius } = ukuranRoda(lebarLayar);

  const isMobile = lebarLayar < 600;

  // ---------- ANIMASI PUTAR INFINITE ----------
  const putar = useRef(new Animated.Value(0)).current;
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const isWeb = Platform.OS === 'web';

    const jalankanAnimasi = () => {
      putar.setValue(0);
      Animated.loop(
        Animated.timing(putar, {
          toValue: 360,
          duration: DURASI,
          easing: Easing.linear,
          useNativeDriver: !isWeb,
        })
      ).start();
    };

    jalankanAnimasi();

    const listenerId = putar.addListener(({ value }) => {
      const nomorKartu = Math.round(-value / sudutAntar);
      const di = ((nomorKartu % JUMLAH_KARTU) + JUMLAH_KARTU) % JUMLAH_KARTU;
      setAktif(di % ANGGOTA.length);
    });

    return () => {
      putar.removeListener(listenerId);
      putar.stopAnimation();
    };
  }, [putar, sudutAntar]);

  // ---------- GEOMETRI RODA ----------
  const diagonal = Math.hypot(lebarKartu, tinggiKartu);
  const D = Math.ceil(2 * (radius + diagonal / 2)) + 10;
  const tengah = D / 2;

  const MARGIN_ATAS = isMobile ? 8 : 12;
  const pusatY = MARGIN_ATAS + tinggiKartu / 2 + radius;

  // TINGGI SEKSI: Menyesuaikan agar batas potongan roda pas dan memberikan ruang untuk penunjuk nama
  const tinggiSeksi = MARGIN_ATAS + tinggiKartu + (radius * (isMobile ? 0.10 : 0.14)) + (isMobile ? 18 : 26);

  // ---------- CINCIN TULISAN MELINGKAR ----------
  const radiusTeks = Math.max(30, radius - tinggiKartu / 2 - (isMobile ? 30 : 45));
  const hurufCincin = useMemo(() => {
    if (radiusTeks < 30) return [];
    const total = Math.floor((2 * Math.PI * radiusTeks) / 10.5);
    return Array.from({ length: total }).map((_, j) => ({
      huruf: POLA_TULISAN[j % POLA_TULISAN.length],
      sudut: (j * 360) / total,
    }));
  }, [radiusTeks]);

  return (
    <View style={[styles.seksi, { height: tinggiSeksi }]}>
      {/* WADAH RODA BERPUTAR */}
      <Animated.View
        style={{
          position: 'absolute',
          width: D,
          height: D,
          left: lebarLayar / 2 - D / 2,
          top: pusatY - D / 2,
          transform: [
            {
              rotate: putar.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        {/* Cincin Tulisan Melingkar */}
        {hurufCincin.map((h, j) => (
          <View
            key={`t${j}`}
            style={{
              position: 'absolute',
              width: 14,
              alignItems: 'center',
              left: tengah + radiusTeks * Math.sin(keRadian(h.sudut)) - 7,
              top: tengah - radiusTeks * Math.cos(keRadian(h.sudut)) - 8,
              transform: [{ rotate: `${h.sudut}deg` }],
            }}
          >
            <Text style={styles.hurufCincin}>{h.huruf}</Text>
          </View>
        ))}

        {/* Kartu Anggota */}
        {Array.from({ length: JUMLAH_KARTU }).map((_, i) => {
          const sudut = i * sudutAntar;
          const { Komponen } = ANGGOTA[i % ANGGOTA.length];

          return (
            <View
              key={`k${i}`}
              style={{
                position: 'absolute',
                width: lebarKartu,
                height: tinggiKartu,
                left: tengah + radius * Math.sin(keRadian(sudut)) - lebarKartu / 2,
                top: tengah - radius * Math.cos(keRadian(sudut)) - tinggiKartu / 2,
                transform: [{ rotate: `${sudut}deg` }],
              }}
            >
              <Komponen />
            </View>
          );
        })}
      </Animated.View>

      {/* PENUNJUK & PIL NAMA */}
      <View
        style={[
          styles.penunjuk,
          { top: MARGIN_ATAS + tinggiKartu + (isMobile ? 2 : 6), pointerEvents: 'none' },
        ]}
      >
        <Text style={[styles.segitiga, isMobile && { fontSize: 10, lineHeight: 11 }]}>▲</Text>
        <View style={[styles.pil, isMobile && { paddingVertical: 2, paddingHorizontal: 10 }]}>
          <Text style={[styles.teksPil, isMobile && { fontSize: 10, letterSpacing: 1 }]}>
            {ANGGOTA[aktif].nama.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  seksi: {
    width: '100%',
    overflow: 'hidden', // Memotong setengah bagian bawah kartu secara rapi
    position: 'relative',
    zIndex: 1,
  },
  hurufCincin: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A3A3A3',
  },
  penunjuk: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  segitiga: {
    fontSize: 12,
    color: WARNA.teks,
    lineHeight: 14,
  },
  pil: {
    backgroundColor: WARNA.utama,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 2,
  },
  teksPil: {
    color: WARNA.teksPutih,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.5,
  },
});