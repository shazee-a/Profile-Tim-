import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function MenuRumus() {
  // State untuk memilih kartu modul yang dibuka
  const [modulTerpilih, setModulTerpilih] = useState<"p03" | "p04" | "p05">(
    "p03",
  );

  // State Sub-Tab Rumus P03
  const [rumusAktif, setRumusAktif] = useState<
    "segitiga" | "tabung" | "kotak" | "lingkaran"
  >("segitiga");

  // State Hitungan Rumus
  const [alas, setAlas] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasilSegitiga, setHasilSegitiga] = useState<number | null>(null);

  const [rTabung, setRTabung] = useState("");
  const [tTabung, setTTabung] = useState("");
  const [hasilTabung, setHasilTabung] = useState<number | null>(null);

  const [sisi, setSisi] = useState("");
  const [hasilKotak, setHasilKotak] = useState<number | null>(null);

  const [rLingkaran, setRLingkaran] = useState("");
  const [hasilLingkaran, setHasilLingkaran] = useState<number | null>(null);

  // Fungsi Kalkulasi
  const hitungSegitiga = () => {
    const a = parseFloat(alas);
    const t = parseFloat(tinggi);
    if (!isNaN(a) && !isNaN(t)) setHasilSegitiga(0.5 * a * t);
    else alert("Masukkan alas & tinggi yang valid!");
  };

  const hitungTabung = () => {
    const r = parseFloat(rTabung);
    const t = parseFloat(tTabung);
    if (!isNaN(r) && !isNaN(t)) setHasilTabung(Math.PI * Math.pow(r, 2) * t);
    else alert("Masukkan jari-jari & tinggi yang valid!");
  };

  const hitungKotak = () => {
    const s = parseFloat(sisi);
    if (!isNaN(s)) setHasilKotak(s * s);
    else alert("Masukkan panjang sisi yang valid!");
  };

  const hitungLingkaran = () => {
    const r = parseFloat(rLingkaran);
    if (!isNaN(r)) setHasilLingkaran(Math.PI * Math.pow(r, 2));
    else alert("Masukkan jari-jari yang valid!");
  };

  return (
    <View style={styles.container}>
      {/* 1. SECTION SLIDER HORISONTAL (SLIDE KIRI / KANAN ALA COMPFEST) */}
      <Text style={styles.sectionHeader}>EXPLORE TASKS & PROJECTS</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContent}
        decelerationRate="fast"
        snapToInterval={280}
      >
        {/* KARTU 1: P03 OPERATOR RUMUS */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.cardSlider,
            modulTerpilih === "p03" && styles.cardSliderAktif,
          ]}
          onPress={() => setModulTerpilih("p03")}
        >
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>WEEK 3</Text>
          </View>
          <Text style={styles.cardTitle}>P03 - Operator Matematika</Text>
          <Text style={styles.cardDesc}>
            Fitur kalkulator rumus Luas Segitiga, Tabung, Kotak, & Lingkaran.
          </Text>
          <Text style={styles.cardFooterText}>
            {modulTerpilih === "p03" ? "● Currently Active" : "Click to Open →"}
          </Text>
        </TouchableOpacity>

        {/* KARTU 2: P04 COMING SOON */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.cardSlider,
            modulTerpilih === "p04" && styles.cardSliderAktif,
          ]}
          onPress={() => setModulTerpilih("p04")}
        >
          <View style={[styles.tagBadge, { backgroundColor: "#3b82f6" }]}>
            <Text style={styles.tagText}>WEEK 4</Text>
          </View>
          <Text style={styles.cardTitle}>P04 - State & Interactive UI</Text>
          <Text style={styles.cardDesc}>
            Fitur modul interaktif minggu depan.
          </Text>
          <Text style={styles.cardFooterText}>
            {modulTerpilih === "p04" ? "● Currently Active" : "Click to Open →"}
          </Text>
        </TouchableOpacity>

        {/* KARTU 3: P05 COMING SOON */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.cardSlider,
            modulTerpilih === "p05" && styles.cardSliderAktif,
          ]}
          onPress={() => setModulTerpilih("p05")}
        >
          <View style={[styles.tagBadge, { backgroundColor: "#10b981" }]}>
            <Text style={styles.tagText}>WEEK 5</Text>
          </View>
          <Text style={styles.cardTitle}>P05 - Advanced Component</Text>
          <Text style={styles.cardDesc}>
            Fitur modul interaktif pengerjaan kelompok selanjutnya.
          </Text>
          <Text style={styles.cardFooterText}>
            {modulTerpilih === "p05" ? "● Currently Active" : "Click to Open →"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 2. KONTEN DETAIL SESUAI KARTU YANG DIKLIK */}
      {modulTerpilih === "p03" && (
        <View style={styles.detailBox}>
          {/* Sub-tab pilihan rumus */}
          <View style={styles.subTabRow}>
            <TouchableOpacity
              style={[
                styles.subTab,
                rumusAktif === "segitiga" && styles.subTabAktif,
              ]}
              onPress={() => setRumusAktif("segitiga")}
            >
              <Text
                style={[
                  styles.subTabText,
                  rumusAktif === "segitiga" && styles.subTabTextAktif,
                ]}
              >
                Segitiga (Zaky)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subTab,
                rumusAktif === "tabung" && styles.subTabAktif,
              ]}
              onPress={() => setRumusAktif("tabung")}
            >
              <Text
                style={[
                  styles.subTabText,
                  rumusAktif === "tabung" && styles.subTabTextAktif,
                ]}
              >
                Tabung (Fadli)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subTab,
                rumusAktif === "kotak" && styles.subTabAktif,
              ]}
              onPress={() => setRumusAktif("kotak")}
            >
              <Text
                style={[
                  styles.subTabText,
                  rumusAktif === "kotak" && styles.subTabTextAktif,
                ]}
              >
                Kotak (Zain)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subTab,
                rumusAktif === "lingkaran" && styles.subTabAktif,
              ]}
              onPress={() => setRumusAktif("lingkaran")}
            >
              <Text
                style={[
                  styles.subTabText,
                  rumusAktif === "lingkaran" && styles.subTabTextAktif,
                ]}
              >
                Lingkaran (Shaquilla)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Rumus */}
          <View style={styles.formCard}>
            {rumusAktif === "segitiga" && (
              <View>
                <Text style={styles.formTitle}>
                  📐 Kalkulator Luas Segitiga
                </Text>
                <Text style={styles.formFormula}>
                  Formula: 1/2 × Alas × Tinggi
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nilai Alas (a)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={alas}
                  onChangeText={setAlas}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nilai Tinggi (t)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={tinggi}
                  onChangeText={setTinggi}
                />
                <TouchableOpacity
                  style={styles.btnCalculate}
                  onPress={hitungSegitiga}
                >
                  <Text style={styles.btnText}>Hitung Luas</Text>
                </TouchableOpacity>
                {hasilSegitiga !== null && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                      Hasil: {hasilSegitiga.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {rumusAktif === "tabung" && (
              <View>
                <Text style={styles.formTitle}>
                  🛢️ Kalkulator Volume Tabung
                </Text>
                <Text style={styles.formFormula}>Formula: π × r² × t</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Jari-jari (r)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={rTabung}
                  onChangeText={setRTabung}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tinggi Tabung (t)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={tTabung}
                  onChangeText={setTTabung}
                />
                <TouchableOpacity
                  style={styles.btnCalculate}
                  onPress={hitungTabung}
                >
                  <Text style={styles.btnText}>Hitung Volume</Text>
                </TouchableOpacity>
                {hasilTabung !== null && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                      Hasil: {hasilTabung.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {rumusAktif === "kotak" && (
              <View>
                <Text style={styles.formTitle}>
                  🔲 Kalkulator Luas Kotak / Persegi
                </Text>
                <Text style={styles.formFormula}>Formula: Sisi × Sisi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Panjang Sisi (s)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={sisi}
                  onChangeText={setSisi}
                />
                <TouchableOpacity
                  style={styles.btnCalculate}
                  onPress={hitungKotak}
                >
                  <Text style={styles.btnText}>Hitung Luas</Text>
                </TouchableOpacity>
                {hasilKotak !== null && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                      Hasil: {hasilKotak.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {rumusAktif === "lingkaran" && (
              <View>
                <Text style={styles.formTitle}>
                  ⚪ Kalkulator Luas Lingkaran
                </Text>
                <Text style={styles.formFormula}>Formula: π × r²</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Jari-jari Lingkaran (r)"
                  placeholderTextColor="#777"
                  keyboardType="numeric"
                  value={rLingkaran}
                  onChangeText={setRLingkaran}
                />
                <TouchableOpacity
                  style={styles.btnCalculate}
                  onPress={hitungLingkaran}
                >
                  <Text style={styles.btnText}>Hitung Luas</Text>
                </TouchableOpacity>
                {hasilLingkaran !== null && (
                  <View style={styles.resultBox}>
                    <Text style={styles.resultText}>
                      Hasil: {hasilLingkaran.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      )}

      {modulTerpilih === "p04" && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            🚀 Modul P04 bakal dibuka minggu depan!
          </Text>
        </View>
      )}

      {modulTerpilih === "p05" && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>🔒 Modul P05 belum tersedia.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 16,
  },
  sliderContent: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 16,
  },
    cardSlider: {
    width: 320, // Diperbesar dari 260 ke 320 biar kaya web COMPFEST
    backgroundColor: '#18181b',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#27272a',
    justifyContent: 'space-between',
  },
  cardSliderAktif: {
    borderColor: "#e63946",
    backgroundColor: "#09090b",
    transform: [{ scale: 1.03 }],
    shadowColor: "#e63946",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  tagBadge: {
    backgroundColor: "#e63946",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  tagText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardDesc: {
    color: "#a1a1aa",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 16,
  },
  cardFooterText: {
    color: "#e63946",
    fontSize: 11,
    fontWeight: "700",
  },
  detailBox: {
    marginTop: 10,
    paddingHorizontal: 16,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  subTabRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  subTab: {
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#111111",
  },
  subTabAktif: {
    backgroundColor: "#e63946",
    borderColor: "#e63946",
  },
  subTabText: {
    color: "#111111",
    fontSize: 11,
    fontWeight: "700",
  },
  subTabTextAktif: {
    color: "#ffffff",
  },
  formCard: {
    backgroundColor: "#09090b",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  formTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  formFormula: {
    color: "#e63946",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#18181b",
    color: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  btnCalculate: {
    backgroundColor: "#e63946",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 14,
  },
  resultBox: {
    marginTop: 14,
    padding: 12,
    backgroundColor: "#052e16",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    color: "#4ade80",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyBox: {
    marginTop: 20,
    padding: 30,
    backgroundColor: "#18181b",
    borderRadius: 16,
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 500,
    width: "90%",
  },
  emptyText: {
    color: "#a1a1aa",
    fontWeight: "700",
  },
});
