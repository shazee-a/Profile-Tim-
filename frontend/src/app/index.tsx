import { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Header from '../../components/Header';
import RodaKartu from '../../components/RodaKartu';
import LuasCalculator from '../../components/math/LuasCalculator';
import { WARNA } from '../../components/theme';

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 600;
  const isSmallScreen = height < 700 || width < 380;

  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'about'>('home');
  const [posisiProject, setPosisiProject] = useState(0);
  const [posisiAbout, setPosisiAbout] = useState(0);

  const skalaTeks = (ukuran: number) => {
    const rasio = width / 375;
    const hasil = Math.round(ukuran * rasio);
    return Math.max(Math.min(hasil, ukuran * 1.3), ukuran * 0.8);
  };

  const keHome = () => {
    setActiveTab('home');
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const keProject = () => {
    setActiveTab('project');
    scrollRef.current?.scrollTo({ y: posisiProject, animated: true });
  };

  const keAboutUs = () => {
    setActiveTab('about');
    scrollRef.current?.scrollTo({ y: posisiAbout, animated: true });
  };

  return (
    <View style={styles.layar}>
      {/* ===== FLOATING GLASSMORPHISM NAVBAR ===== */}
      <View style={styles.floatingNavWrapper}>
        <View style={styles.floatingNav}>
          <TouchableOpacity
            onPress={keHome}
            activeOpacity={0.8}
            style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          >
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
              HOME
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={keProject}
            activeOpacity={0.8}
            style={[styles.navItem, activeTab === 'project' && styles.navItemActive]}
          >
            <Text style={[styles.navText, activeTab === 'project' && styles.navTextActive]}>
              PROJECT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={keAboutUs}
            activeOpacity={0.8}
            style={[styles.navItem, activeTab === 'about' && styles.navItemActive]}
          >
            <Text style={[styles.navText, activeTab === 'about' && styles.navTextActive]}>
              ABOUT US
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== ISI HALAMAN UTAMA (SCROLLABLE) ===== */}
      <ScrollView
        ref={scrollRef}
        style={styles.areaScroll}
        contentContainerStyle={[
          styles.isiScroll,
          { paddingBottom: isSmallScreen ? 10 : 20 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* HERO HEADER (HOME) */}
        <View style={styles.seksiHome}>
          <Header
            sapaan={'WELCOME\nTO OUR WEB'}
            judul="INFINIPAGE"
            kiriBawah="KELOMPOK 5"
            kananBawah="PEMROGRAMAN MOBILE"
          />
        </View>

        {/* KALKULATOR LUAS (PROJECT) */}
        <View
          style={styles.areaBody}
          onLayout={(e) => setPosisiProject(e.nativeEvent.layout.y)}
        >
          <LuasCalculator />
        </View>

        {/* RODA KARTU & FOOTER (ABOUT US) */}
        <View
          style={styles.areaBawahTransparan}
          onLayout={(e) => setPosisiAbout(e.nativeEvent.layout.y)}
        >
          <View style={styles.areaRoda}>
            <RodaKartu />
          </View>

          {/* FOOTER & PETUNJUK */}
          <View
            style={[
              styles.wadahPetunjuk,
              { marginTop: isSmallScreen ? 4 : 8 },
            ]}
          >
            <Text
              style={[
                styles.petunjuk,
                {
                  fontSize: skalaTeks(10),
                  letterSpacing: 1,
                },
              ]}
              numberOfLines={1}
            >
              TEKAN KARTU UNTUK MELIHAT PROFIL
            </Text>
            <Text
              style={[
                styles.kaki,
                {
                  fontSize: skalaTeks(8.5),
                  marginTop: 2,
                },
              ]}
              numberOfLines={1}
            >
              Dibuat dengan React Native + Expo
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layar: {
    flex: 1,
    backgroundColor: WARNA.latar,
  },
  /* FLOATING NAVBAR CONTAINER */
  floatingNavWrapper: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  floatingNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.75)', // Transparan gelap modern
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 30, // Kapsul melengkung
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
    gap: 4,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  navItemActive: {
    backgroundColor: '#E63946', // Warna aksen merah khas portfolio
  },
  navText: {
    color: '#A0A0A0',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1.2,
  },
  navTextActive: {
    color: '#FFFFFF',
  },
  areaScroll: {
    flex: 1,
  },
  isiScroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  seksiHome: {
    width: '100%',
  },
  areaBody: {
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  areaBawahTransparan: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },
  areaRoda: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wadahPetunjuk: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 30,
  },
  petunjuk: {
    textAlign: 'center',
    fontWeight: '800',
    color: WARNA.teks,
  },
  kaki: {
    textAlign: 'center',
    color: WARNA.teksPudar,
    fontWeight: '500',
  },
});