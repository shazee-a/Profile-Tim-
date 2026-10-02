/**
 * ============================================================
 * FadeInUp.tsx  —  ANIMASI MUNCUL (NAIK PERLAHAN + MEMUDAR MASUK)
 * ============================================================
 * Membungkus komponen apa saja. Saat halaman dibuka, isi
 * pembungkus ini muncul dari bawah sambil memudar masuk.
 *
 * Props:
 *  - urutan   : angka 0,1,2,3... Semakin besar, semakin telat
 *               munculnya. Dipakai agar kartu muncul satu per satu.
 *  - children : komponen yang dibungkus
 *
 * Cara pakai:
 *   <FadeInUp urutan={0}><ProfilFadli /></FadeInUp>
 */
import { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
  urutan: number;
  children: ReactNode;
};

export default function FadeInUp({ urutan, children }: Props) {
  // nilai = angka animasi yang bergerak dari 0 ke 1
  const nilai = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(nilai, {
      toValue: 1,
      duration: 600,
      delay: 300 + urutan * 150, // tiap kartu telat 0,15 detik dari sebelumnya
      useNativeDriver: true,
    }).start();
  }, [nilai, urutan]);

  return (
    <Animated.View
      style={{
        opacity: nilai, // dari transparan (0) ke terlihat (1)
        transform: [
          // dari 40 piksel di bawah, naik ke posisi asli
          { translateY: nilai.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}
