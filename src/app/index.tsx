/**
 * ============================================================
 * src/app/index.tsx — GRADIENT BACKGROUND & DYNAMIC SHELL
 * ============================================================
 */
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Header from "../../components/Header";
import MenuRumus from "../../components/MenuRumus";
import RodaKartu from "../../components/RodaKartu";
import { WARNA } from "../../components/theme";

export default function Index() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 450;

  // State untuk Tab Navigasi Footer
  const [tabAktif, setTabAktif] = useState<"profil" | "proyek" | "info">(
    "profil",
  );

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const idGaya = "media-queries-portofolio";
      if (!document.getElementById(idGaya)) {
        const styleEl = document.createElement("style");
        styleEl.id = idGaya;
        styleEl.innerHTML = `
          html, body, #root {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background-color: transparent !important;
          }
        `;
        document.head.appendChild(styleEl);
      }
    }
  }, []);

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.layarUtama}
    >
      {/* 1. HEADER DILAPIS KONDISI: Cuma muncul saat tab PROFIL aktif */}
      {tabAktif === "profil" && (
        <View style={styles.wadahHeaderFixed}>
          <Header
            sapaan={"WELCOME\nTO OUR TEAM"}
            judul="INFINIPAGE"
            kiriBawah="KELOMPOK 5"
            kananBawah="PEMROGRAMAN MOBILE"
          />
        </View>
      )}

      {/* 2. BODY KONTEN */}
      <View style={styles.areaBodyScroll}>
        <ScrollView
          contentContainerStyle={styles.isiScroll}
          showsVerticalScrollIndicator={false}
        >
          {tabAktif === "proyek" && (
            <View
              style={{ width: "100%", alignItems: "center", paddingTop: 10 }}
            >
              <MenuRumus />
            </View>
          )}

          {tabAktif === "info" && (
            <View style={styles.kartuMenu}>
              <Text style={styles.judulMenu}>ABOUT US - KELOMPOK 5</Text>
              <Text style={styles.deskripsiMenu}>
                Aplikasi Portofolio Tim & Praktikum Pemrograman Mobile berbasis
                React Native & Expo.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 3. KELOMPOK BAWAH FIXED */}
      <View style={styles.wadahBawahFixed}>
        {tabAktif === "profil" && (
          <View style={styles.areaRoda}>
            <RodaKartu />
          </View>
        )}

        {/* NAVIGASI FOOTER */}
        <View style={styles.footerNavigasi}>
          <View style={styles.barisTombolTab}>
            <TouchableOpacity
              style={[
                styles.tombolTab,
                tabAktif === "profil" && styles.tombolTabAktif,
              ]}
              onPress={() => setTabAktif("profil")}
            >
              <Text
                style={[
                  styles.teksTab,
                  tabAktif === "profil" && styles.teksTabAktif,
                ]}
              >
                MEMBER PROFILES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tombolTab,
                tabAktif === "proyek" && styles.tombolTabAktif,
              ]}
              onPress={() => setTabAktif("proyek")}
            >
              <Text
                style={[
                  styles.teksTab,
                  tabAktif === "proyek" && styles.teksTabAktif,
                ]}
              >
                PROJECTS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tombolTab,
                tabAktif === "info" && styles.tombolTabAktif,
              ]}
              onPress={() => setTabAktif("info")}
            >
              <Text
                style={[
                  styles.teksTab,
                  tabAktif === "info" && styles.teksTabAktif,
                ]}
              >
                ABOUT US
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.kakiTeks, { fontSize: isMobile ? 8.5 : 9.5 }]}>
            Dibuat dengan React Native + Expo • Kelompok 5
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// POSISI DEKLARASI STYLES DI PALING BAWAH DI LUAR FUNGSI Index()
const styles = StyleSheet.create({
  layarUtama: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  wadahHeaderFixed: {
    width: "100%",
    flexShrink: 0,
    zIndex: 20,
    backgroundColor: "transparent",
  },
  areaBodyScroll: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  isiScroll: {
    paddingVertical: 10,
    alignItems: "center",
  },
  kartuMenu: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  judulMenu: {
    fontSize: 14,
    fontWeight: "800",
    color: WARNA.teks,
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  deskripsiMenu: {
    fontSize: 12,
    color: WARNA.teksPudar,
    lineHeight: 16,
  },
  wadahBawahFixed: {
    width: "100%",
    flexShrink: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 10,
  },
  areaRoda: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerNavigasi: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    backgroundColor: "transparent",
  },
  barisTombolTab: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  tombolTab: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  tombolTabAktif: {
    backgroundColor: "#FFFFFF",
  },
  teksTab: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  teksTabAktif: {
    color: "#0f2027",
  },
  kakiTeks: {
    textAlign: "center",
    color: "#A1A1AA",
    fontWeight: "500",
  },
});
