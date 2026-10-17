import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Header from '../../components/Header';
import ProjectSection from '../../components/ProjectSection';
import RodaKartu from '../../components/RodaKartu';
import { WARNA } from '../../components/theme';

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 600;
  const isSmallScreen = height < 700 || width < 380;

  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'project' | 'about'>('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const [posisiProject, setPosisiProject] = useState(0);
  const [posisiAbout, setPosisiAbout] = useState(0);

  // Animasi Underline Main Nav
  const animHome = useRef(new Animated.Value(activeTab === 'home' ? 1 : 0)).current;
  const animProj = useRef(new Animated.Value(activeTab === 'project' ? 1 : 0)).current;
  const animAbout = useRef(new Animated.Value(activeTab === 'about' ? 1 : 0)).current;

  const skalaTeks = (ukuran: number) => {
    const rasio = width / 375;
    const hasil = Math.round(ukuran * rasio);
    return Math.max(Math.min(hasil, ukuran * 1.3), ukuran * 0.8);
  };

  const triggerAnim = (type: 'home' | 'project' | 'about', toValue: number) => {
    const targetAnim = type === 'home' ? animHome : type === 'project' ? animProj : animAbout;
    Animated.timing(targetAnim, {
      toValue,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const handleHoverIn = (type: 'home' | 'project' | 'about') => {
    setHoveredTab(type);
    triggerAnim(type, 1);
  };

  const handleHoverOut = (type: 'home' | 'project' | 'about') => {
    setHoveredTab(null);
    if (activeTab !== type) {
      triggerAnim(type, 0);
    }
  };

  // Navigasi ke HOME
  const keHome = () => {
    setActiveTab('home');
    triggerAnim('home', 1);
    triggerAnim('project', 0);
    triggerAnim('about', 0);

    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Navigasi ke PROJECT
  const keProject = () => {
    setActiveTab('project');
    triggerAnim('project', 1);
    triggerAnim('home', 0);
    triggerAnim('about', 0);

    const targetY = Math.max(0, posisiProject - (isMobile ? 64 : 80));
    scrollRef.current?.scrollTo({ y: targetY, animated: true });
  };

  // Navigasi ke awal bagian anggota agar kartu langsung terlihat.
  const keAboutUs = () => {
    setActiveTab('about');
    triggerAnim('about', 1);
    triggerAnim('home', 0);
    triggerAnim('project', 0);

    scrollRef.current?.scrollTo({
      y: Math.max(0, posisiAbout - (isMobile ? 64 : 80)),
      animated: true,
    });
  };

  return (
    <View style={styles.layar}>
      {/* ===== FLOATING NAVBAR UTAMA ===== */}
      <View
        pointerEvents="box-none"
        style={[styles.floatingNavWrapper, isMobile && styles.floatingNavWrapperMobile]}
      >
        <View
          style={[
            styles.floatingNav,
            isMobile && styles.floatingNavMobile,
            isMobile && { maxWidth: width - 24 },
          ]}
        >
          <TouchableOpacity
            onPress={keHome}
            accessibilityRole="button"
            accessibilityLabel="Ke bagian Home"
            hitSlop={6}
            // @ts-ignore
            onMouseEnter={() => handleHoverIn('home')}
            onMouseLeave={() => handleHoverOut('home')}
            activeOpacity={0.8}
            style={[
              styles.navItem,
              isMobile && styles.navItemMobile,
              activeTab === 'home' && styles.navItemActive,
            ]}
          >
            <Text
              style={[
                styles.navText,
                (activeTab === 'home' || hoveredTab === 'home') && styles.navTextActive,
              ]}
            >
              HOME
            </Text>
            <Animated.View
              style={[
                styles.lineUnderMain,
                {
                  width: animHome.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '60%'],
                  }),
                },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={keProject}
            accessibilityRole="button"
            accessibilityLabel="Ke bagian Project"
            hitSlop={6}
            // @ts-ignore
            onMouseEnter={() => handleHoverIn('project')}
            onMouseLeave={() => handleHoverOut('project')}
            activeOpacity={0.8}
            style={[
              styles.navItem,
              isMobile && styles.navItemMobile,
              activeTab === 'project' && styles.navItemActive,
            ]}
          >
            <Text
              style={[
                styles.navText,
                (activeTab === 'project' || hoveredTab === 'project') && styles.navTextActive,
              ]}
            >
              PROJECT
            </Text>
            <Animated.View
              style={[
                styles.lineUnderMain,
                {
                  width: animProj.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '60%'],
                  }),
                },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={keAboutUs}
            accessibilityRole="button"
            accessibilityLabel="Ke bagian About Us"
            hitSlop={6}
            // @ts-ignore
            onMouseEnter={() => handleHoverIn('about')}
            onMouseLeave={() => handleHoverOut('about')}
            activeOpacity={0.8}
            style={[
              styles.navItem,
              isMobile && styles.navItemMobile,
              activeTab === 'about' && styles.navItemActive,
            ]}
          >
            <Text
              style={[
                styles.navText,
                (activeTab === 'about' || hoveredTab === 'about') && styles.navTextActive,
              ]}
            >
              ABOUT US
            </Text>
            <Animated.View
              style={[
                styles.lineUnderMain,
                {
                  width: animAbout.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '60%'],
                  }),
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.areaScroll}
        contentContainerStyle={[
          styles.isiScroll,
          isMobile && styles.isiScrollMobile,
          { paddingBottom: isSmallScreen ? 20 : 40 },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.seksiHome}>
          <Header
            sapaan={'WELCOME\nTO OUR WEB'}
            judul="INFINIPAGE"
            kiriBawah="KELOMPOK 5"
            kananBawah="PEMROGRAMAN MOBILE"
          />
        </View>

        <View
          style={styles.areaBody}
          onLayout={(e) => {
            setPosisiProject(e.nativeEvent.layout.y);
          }}
        >
          <ProjectSection />
        </View>

        <View
          style={styles.areaBawahTransparan}
          onLayout={(e) => setPosisiAbout(e.nativeEvent.layout.y)}
        >
          <View style={styles.areaRoda}>
            <RodaKartu />
          </View>

          <View style={[styles.wadahPetunjuk, { marginTop: isSmallScreen ? 4 : 8 }]}>
            <Text style={[styles.petunjuk, { fontSize: skalaTeks(10), letterSpacing: 1 }]} numberOfLines={1}>
              TEKAN KARTU UNTUK MELIHAT PROFIL
            </Text>
            <Text style={[styles.kaki, { fontSize: skalaTeks(8.5), marginTop: 2 }]} numberOfLines={1}>
              Dibuat dengan React Native + Expo
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: WARNA.latar },
  floatingNavWrapper: { position: 'absolute', top: 16, left: 0, right: 0, alignItems: 'center', zIndex: 9999 },
  floatingNavWrapperMobile: { top: 10 },
  floatingNav: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(18, 18, 18, 0.85)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.35)', elevation: 10, gap: 6 },
  floatingNavMobile: { width: '100%', justifyContent: 'space-between', paddingHorizontal: 6, gap: 0 },
  navItem: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center' },
  navItemMobile: { flex: 1, minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 },
  navItemActive: { backgroundColor: '#FF1236' },
  navText: { color: '#A0A0A0', fontWeight: '800', fontSize: 11, letterSpacing: 1.2 },
  navTextActive: { color: '#FFFFFF', fontWeight: '900' },
  lineUnderMain: { height: 2.5, backgroundColor: '#FFFFFF', borderRadius: 2, marginTop: 3 },
  areaScroll: { flex: 1 },
  isiScroll: { flexGrow: 1, alignItems: 'center' },
  isiScrollMobile: { paddingTop: 18 },
  seksiHome: { width: '100%' },
  areaBody: { width: '100%', maxWidth: 900, paddingHorizontal: 10, marginTop: 20, marginBottom: 40 },
  areaBawahTransparan: { width: '100%', alignItems: 'center', backgroundColor: 'transparent', paddingBottom: 20, marginTop: 20 },
  areaRoda: { width: '100%', alignItems: 'center', backgroundColor: 'transparent' },
  wadahPetunjuk: { width: '100%', alignItems: 'center', paddingHorizontal: 16, zIndex: 30 },
  petunjuk: { textAlign: 'center', fontWeight: '800', color: WARNA.teks },
  kaki: { textAlign: 'center', color: WARNA.teksPudar, fontWeight: '500' },
});