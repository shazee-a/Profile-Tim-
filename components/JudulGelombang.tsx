/**
 * ============================================================
 * JudulGelombang.tsx  —  2 TEKS PASANGAN BERPUTAR 360° (SOLID & OUTLINE)
 * ============================================================
 */
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';

const DURASI = 4800;        // 4.8 detik untuk 1 perputaran penuh 360 derajat
const GELOMBANG = 0.15;     // Gelombang mengalir sekuensial dari Kiri ke Kanan
const SKALA_MIN = 0.22;     // Batas pipih huruf saat berputar ke belakang
const REGANG = 1.32;        // Lebar horizontal teks extended
const TITIK = 60;           // Sampel titik animasi mulus
const MIRING = -8;          // Skew kemiringan poster

const LEBAR_HURUF: Record<string, number> = {
    P: 0.7, O: 0.8, R: 0.72, T: 0.66, F: 0.62, L: 0.58, I: 0.3,
    A: 0.78, B: 0.72, C: 0.74, D: 0.76, E: 0.62, G: 0.78, H: 0.74,
    J: 0.55, K: 0.72, M: 0.92, N: 0.76, Q: 0.8, S: 0.68, U: 0.74,
    V: 0.74, W: 1.0, X: 0.72, Y: 0.72, Z: 0.66, ' ': 0.35,
};
const lebarHuruf = (h: string) => LEBAR_HURUF[h] ?? 0.72;

const FONT = Platform.select({ web: 'Arial Black, Arial, Helvetica, sans-serif', default: undefined });

export function ukuranJudul(teks: string, lebarTotal: number) {
    const satuan = teks.split('').reduce((j, h) => j + lebarHuruf(h), 0) * REGANG;
    const ukuran = Math.min(lebarTotal / satuan, 150);
    const tinggi = ukuran * 0.88;
    const lebar = satuan * ukuran;
    return { ukuran, tinggi, lebar };
}

type HurufSvgProps = {
    huruf: string;
    lebarAsli: number;
    lebarTampil: number;
    tinggi: number;
    ukuran: number;
    warna: string;
    garis: boolean;
};

function HurufSvg({ huruf, lebarAsli, lebarTampil, tinggi, ukuran, warna, garis }: HurufSvgProps) {
    return (
        <Svg
            width={lebarTampil}
            height={tinggi}
            viewBox={`0 0 ${lebarAsli} ${tinggi}`}
            preserveAspectRatio="none"
        >
            <SvgText
                x={lebarAsli / 2}
                y={ukuran * 0.78}
                fontSize={ukuran}
                fontWeight="900"
                fontFamily={FONT}
                textAnchor="middle"
                fill={garis ? 'none' : warna}
                stroke={garis ? warna : 'none'}
                strokeWidth={garis ? Math.max(1.2, ukuran * 0.012) : 0}
            >
                {huruf}
            </SvgText>
        </Svg>
    );
}

type Props = {
    teks: string;
    lebarTotal: number;
    warna: string;
};

export default function JudulGelombang({ teks, lebarTotal, warna }: Props) {
    const putaran = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const isWeb = Platform.OS === 'web';

        const jalankanAnimasi = () => {
            putaran.setValue(0);
            Animated.loop(
                Animated.timing(putaran, {
                    toValue: 1,
                    duration: DURASI,
                    easing: Easing.linear,
                    useNativeDriver: !isWeb,
                })
            ).start();
        };

        jalankanAnimasi();
    }, [putaran]);

    const { ukuran, tinggi, lebar } = ukuranJudul(teks, lebarTotal);

    const huruf = useMemo(() => {
        const masuk = Array.from({ length: TITIK + 1 }, (_, k) => k / TITIK);

        return teks.split('').map((h, i) => {
            const lebarAsli = lebarHuruf(h) * ukuran;
            const fase = masuk.map((t) => 2 * Math.PI * (t + i * GELOMBANG));

            // 1. LAPISAN SOLID PADAT (Depan -> Belakang)
            const skalaIsi = fase.map((f) => SKALA_MIN + (1 - SKALA_MIN) * (0.5 + 0.5 * Math.sin(f)));
            const geserIsi = fase.map((f) => (tinggi / 2.2) * Math.cos(f));
            // Opasitas berkisar 0.25 s/d 1.0 (Tetap tampil sebagai pasangan 2 teks)
            const opacityIsi = fase.map((f) => 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(f)));

            // 2. LAPISAN OUTLINE BERONGGA (Belakang -> Depan / Fase Berlawanan + π)
            const skalaGaris = fase.map((f) => SKALA_MIN + (1 - SKALA_MIN) * (0.5 + 0.5 * Math.sin(f + Math.PI)));
            const geserGaris = fase.map((f) => (tinggi / 2.2) * Math.cos(f + Math.PI));
            const opacityGaris = fase.map((f) => 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(f + Math.PI)));

            const ip = (output: (number | string)[]) =>
                putaran.interpolate({ inputRange: masuk, outputRange: output as never[] });

            return {
                h,
                lebarAsli,
                opIsi: ip(opacityIsi),
                opGaris: ip(opacityGaris),
                isi: [
                    { translateY: ip(geserIsi) },
                    { scaleY: ip(skalaIsi) },
                    { skewX: `${MIRING}deg` }
                ],
                garis: [
                    { translateY: ip(geserGaris) },
                    { scaleY: ip(skalaGaris) },
                    { skewX: `${MIRING}deg` }
                ],
            };
        });
    }, [teks, ukuran, tinggi, warna, putaran]);

    return (
        <View style={[styles.baris, { width: lebar, height: tinggi }]} accessibilityLabel={teks}>
            {huruf.map((x, i) => {
                const lebarTampil = x.lebarAsli * REGANG;
                return (
                    <View key={i} style={{ width: lebarTampil, height: tinggi }}>
                        {/* LAPISAN OUTLINE BERONGGA */}
                        <Animated.View style={[StyleSheet.absoluteFill, { transform: x.garis as never, opacity: x.opGaris as never, zIndex: 1 }]}>
                            <HurufSvg
                                huruf={x.h}
                                lebarAsli={x.lebarAsli}
                                lebarTampil={lebarTampil}
                                tinggi={tinggi}
                                ukuran={ukuran}
                                warna={warna}
                                garis
                            />
                        </Animated.View>

                        {/* LAPISAN SOLID PADAT */}
                        <Animated.View style={[StyleSheet.absoluteFill, { transform: x.isi as never, opacity: x.opIsi as never, zIndex: 2 }]}>
                            <HurufSvg
                                huruf={x.h}
                                lebarAsli={x.lebarAsli}
                                lebarTampil={lebarTampil}
                                tinggi={tinggi}
                                ukuran={ukuran}
                                warna={warna}
                                garis={false}
                            />
                        </Animated.View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    baris: { flexDirection: 'row', alignSelf: 'center' },
});