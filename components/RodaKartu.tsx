/**
 * ============================================================
 * RodaKartu.tsx  —  RODA KARTU ANGGOTA YANG BERPUTAR
 * ============================================================
 * Kartu-kartu anggota disusun melingkar seperti RODA, lalu roda
 * berputar pelan tanpa henti. Hanya bagian atas roda yang terlihat
 * (bagian bawahnya terpotong), seperti pada desain referensi.
 *
 * LOOPING: anggota hanya 4 orang, tetapi roda berisi 12 kartu
 * (4 anggota diulang 3 kali, lihat JUMLAH_KARTU di roda.ts)
 * sehingga lingkaran roda penuh dan tidak ada ruang kosong.
 *
 * Cara kerja:
 *   1. WADAH RODA  = kotak besar yang diputar (rotate 0 → 360 derajat,
 *      berulang). Pusat putarannya otomatis di tengah kotak.
 *   2. Tiap KARTU  = ditaruh di tepi lingkaran dengan rumus
 *        x = tengah + radius × sin(sudut)
 *        y = tengah − radius × cos(sudut)
 *      lalu kartunya diputar sebesar `sudut` agar menghadap keluar.
 *   3. CINCIN TULISAN = huruf-huruf kecil yang disusun melingkar di
 *      dalam kartu, ikut berputar bersama roda.
 *   4. PENUNJUK (▲ + nama) di bawah kartu paling atas. Namanya
 *      berganti otomatis sesuai kartu yang sedang di atas.
 *
 * Tiap kartu adalah komponen anggota (ProfilFadli, dst.), jadi
 * menekan kartu mana pun membuka pop-up profil orang itu.
 *
 * PENGATURAN: DURASI = lama satu putaran penuh (milidetik).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import ProfilFadli from './members/ProfilFadli';
import ProfilShaquilla from './members/ProfilShaquilla';
import ProfilZain from './members/ProfilZain';
import ProfilZaky from './members/ProfilZaky';
import { JUMLAH_KARTU, ukuranRoda } from './Roda';
import { WARNA } from './theme';

const DURASI = 50000;              // 50 detik per putaran penuh
const POLA_TULISAN = 'TIM PORTFOLIO  •  ';
const MARGIN_ATAS = 28;            // jarak kartu paling atas dari tepi atas seksi

// Urutan anggota di roda (diulang terus). `nama` dipakai untuk penunjuk.
const ANGGOTA = [
  { nama: 'Fadli', Komponen: ProfilFadli },
  { nama: 'Zain', Komponen: ProfilZain },
  { nama: 'Zaky', Komponen: ProfilZaky },
  { nama: 'Shaquilla', Komponen: ProfilShaquilla },
];

const keRadian = (derajat: number) => (derajat * Math.PI) / 180;

export default function RodaKartu() {
  const { width } = useWindowDimensions();
  const { lebarKartu, tinggiKartu, sudutAntar, radius } = ukuranRoda(width);

  // ---------- ANIMASI PUTAR (berulang terus) ----------
  const putar = useRef(new Animated.Value(0)).current;
  const waktuMulai = useRef(Date.now()).current;
  const [aktif, setAktif] = useState(0); // nomor anggota yang sedang di atas

  useEffect(() => {
    const animasi = Animated.loop(
      Animated.timing(putar, {
        toValue: 360,
        duration: DURASI,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animasi.start();

    // Hitung kartu mana yang sedang berada di atas (untuk nama di penunjuk)
    const pewaktu = setInterval(() => {
      const derajat = (((Date.now() - waktuMulai) % DURASI) / DURASI) * 360;
      const nomorKartu = Math.round(-derajat / sudutAntar);
      const di = ((nomorKartu % JUMLAH_KARTU) + JUMLAH_KARTU) % JUMLAH_KARTU;
      setAktif(di % ANGGOTA.length);
    }, 250);

    return () => {
      clearInterval(pewaktu);
      animasi.stop();
    };
  }, [putar, waktuMulai, sudutAntar]);

  // ---------- GEOMETRI RODA ----------
  const diagonal = Math.hypot(lebarKartu, tinggiKartu);
  const D = Math.ceil(2 * (radius + diagonal / 2)) + 4; // sisi kotak wadah roda
  const tengah = D / 2;
  const pusatY = MARGIN_ATAS + tinggiKartu / 2 + radius; // pusat roda dalam seksi
  const tinggiSeksi = MARGIN_ATAS + tinggiKartu + radius * 0.3 + 70;

  // ---------- CINCIN TULISAN MELINGKAR ----------
  const radiusTeks = radius - tinggiKartu / 2 - 76;
  const hurufCincin = useMemo(() => {
    if (radiusTeks < 50) return [];
    const total = Math.floor((2 * Math.PI * radiusTeks) / 10.5);
    return Array.from({ length: total }).map((_, j) => ({
      huruf: POLA_TULISAN[j % POLA_TULISAN.length],
      sudut: (j * 360) / total,
    }));
  }, [radiusTeks]);

  return (
    <View style={[styles.seksi, { height: tinggiSeksi }]}>
      {/* ===== WADAH RODA (berputar) ===== */}
      <Animated.View
        style={{
          position: 'absolute',
          width: D,
          height: D,
          left: width / 2 - D / 2,
          top: pusatY - D / 2,
          transform: [
            { rotate: putar.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) },
          ],
        }}
      >
        {/* Cincin tulisan */}
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

        {/* Kartu-kartu anggota di tepi lingkaran (LOOPING: diulang sampai penuh) */}
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

      {/* ===== PENUNJUK: ▲ + nama anggota yang sedang di atas ===== */}
      <View
        style={[
          styles.penunjuk,
          { top: MARGIN_ATAS + tinggiKartu + 8, pointerEvents: 'none' },
        ]}
      >
        <Text style={styles.segitiga}>▲</Text>
        <View style={styles.pil}>
          <Text style={styles.teksPil}>{ANGGOTA[aktif].nama.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // overflow hidden: bagian bawah roda terpotong rapi
  seksi: { width: '100%', overflow: 'hidden' },
  hurufCincin: { fontSize: 11, fontWeight: '800', color: '#A3A3A3' },
  penunjuk: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  segitiga: { fontSize: 12, color: WARNA.teks, lineHeight: 14 },
  pil: {
    backgroundColor: WARNA.utama,
    paddingVertical: 4, paddingHorizontal: 12,
    borderRadius: 12, marginTop: 2,
  },
  teksPil: { color: WARNA.teksPutih, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 },
});