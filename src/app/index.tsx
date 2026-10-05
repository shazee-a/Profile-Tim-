/**
 * ============================================================
 * src/app/index.tsx — FIXED SHELL LAYOUT (HEADER & FOOTER FIXED, BODY SCROLLABLE)
 * ============================================================
 */
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Header from '../../components/Header';
import RodaKartu from '../../components/RodaKartu';
import { WARNA } from '../../components/theme';

// Contoh Data Menu/Konten Body
const DAFTAR_MENU = [
  { id: '1', judul: 'Luas Segitiga', deskripsi: 'Menghitung luas segitiga' },
  { id: '2', judul: 'Luas Tabung', deskripsi: 'Menghitung luas tabung' },
  { id: '3', judul: 'Luas Persegi', deskripsi: 'Menghitung luas persegi' },
  { id: '4', judul: 'Luas Lingkaran', deskripsi: 'Menghitung luas lingkaran' },
];

export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 450;
  const isTablet = width <= 758;

  // State untuk Tab Navigasi Footer
  const [tabAktif, setTabAktif] = useState<'profil' | 'proyek' | 'info'>('profil');

  // Pasang CSS Global untuk mengunci height body web agar tidak ada scrollbar browser luar
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const idGaya = 'media-queries-portofolio';
      if (!document.getElementById(idGaya)) {
        const styleEl = document.createElement('style');
        styleEl.id = idGaya;
        styleEl.innerHTML = `
          html, body, #root {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background-color: ${WARNA.latar} !important;
          }
        `;
        document.head.appendChild(styleEl);
      }
    }
  }, []);

  return (
    <View style={styles.layarUtama}>
      {/* 1. HEADER FIXED (TETAP DI ATAS) */}
      <View style={styles.wadahHeaderFixed}>
        <Header
          sapaan={'WELCOME\nTO OUR TEAM'}
          judul="INFINIPAGE"
          kiriBawah="KELOMPOK 5"
          kananBawah="PEMROGRAMAN MOBILE"
        />
      </View>

      {/* 2. BODY KONTEN MENU (BISA DI-SCROLL DI TENGAH) */}
      <View style={styles.areaBodyScroll}>
        <ScrollView
          contentContainerStyle={styles.isiScroll}
          showsVerticalScrollIndicator={false}
        >
          {DAFTAR_MENU.map((item) => (
            <View key={item.id} style={styles.kartuMenu}>
              <Text style={styles.judulMenu}>{item.judul}</Text>
              <Text style={styles.deskripsiMenu}>{item.deskripsi}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 3. KELOMPOK BAWAH FIXED (RODA KARTU + NAVIGASI FOOTER ATTACHED) */}
      <View style={styles.wadahBawahFixed}>
        {/* RODA KARTU MEMBER (NATIVE ANCHOR) */}
        <View style={styles.areaRoda}>
          <RodaKartu />
        </View>

        {/* NAVIGASI FOOTER (TOMBOL TAB MENU) */}
        <View style={styles.footerNavigasi}>
          <View style={styles.barisTombolTab}>
            <TouchableOpacity
              style={[styles.tombolTab, tabAktif === 'profil' && styles.tombolTabAktif]}
              onPress={() => setTabAktif('profil')}
            >
              <Text style={[styles.teksTab, tabAktif === 'profil' && styles.teksTabAktif]}>
                MEMBER PROFILES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tombolTab, tabAktif === 'proyek' && styles.tombolTabAktif]}
              onPress={() => setTabAktif('proyek')}
            >
              <Text style={[styles.teksTab, tabAktif === 'proyek' && styles.teksTabAktif]}>
                PROJECTS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tombolTab, tabAktif === 'info' && styles.tombolTabAktif]}
              onPress={() => setTabAktif('info')}
            >
              <Text style={[styles.teksTab, tabAktif === 'info' && styles.teksTabAktif]}>
                ABOUT US
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.kakiTeks, { fontSize: isMobile ? 8.5 : 9.5 }]}>
            Dibuat dengan React Native + Expo • Kelompok 5
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layarUtama: {
    flex: 1,
    height: '100%',
    backgroundColor: WARNA.latar,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  wadahHeaderFixed: {
    width: '100%',
    flexShrink: 0,
    zIndex: 20,
    backgroundColor: WARNA.latar,
  },
  areaBodyScroll: {
    flex: 1, // Mengisi ruang kosong tengah untuk menu scrollable
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  isiScroll: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  kartuMenu: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  judulMenu: {
    fontSize: 13,
    fontWeight: '800',
    color: WARNA.teks,
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  deskripsiMenu: {
    fontSize: 11,
    color: WARNA.teksPudar,
    lineHeight: 15,
  },
  wadahBawahFixed: {
    width: '100%',
    flexShrink: 0,
    alignItems: 'center',
    backgroundColor: WARNA.latar,
    zIndex: 10,
  },
  areaRoda: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerNavigasi: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: WARNA.latar,
  },
  barisTombolTab: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  tombolTab: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: WARNA.teks,
    backgroundColor: 'transparent',
  },
  tombolTabAktif: {
    backgroundColor: WARNA.teks,
  },
  teksTab: {
    fontSize: 9,
    fontWeight: '800',
    color: WARNA.teks,
    letterSpacing: 1,
  },
  teksTabAktif: {
    color: WARNA.latar,
  },
  kakiTeks: {
    textAlign: 'center',
    color: WARNA.teksPudar,
    fontWeight: '500',
  },
});