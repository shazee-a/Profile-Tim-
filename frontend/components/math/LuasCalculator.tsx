import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://localhost:8000/api/v1/calculate';

const DAFTAR_RUMUS = [
  { id: 'triangle', judul: 'Luas Segitiga', pembuat: 'Zaky', formula: '½ × a × t' },
  { id: 'cylinder', judul: 'Isi Tabung', pembuat: 'Fadli', formula: 'π × r² × t' },
  { id: 'square', judul: 'Luas Kotak', pembuat: 'Zain', formula: 'sisi × sisi' },
  { id: 'circle', judul: 'Luas Lingkaran', pembuat: 'Shaquilla', formula: 'π × r²' },
];

export default function LuasCalculator() {
  const [indexAktif, setIndexAktif] = useState(0);

  // Animasi Pergeseran Kartu (Horizontal Offset)
  const animX = useRef(new Animated.Value(0)).current;

  // State Inputs
  const [alas, setAlas] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [radius, setRadius] = useState('');
  const [tinggiTabung, setTinggiTabung] = useState('');
  const [sisi, setSisi] = useState('');

  // State Output API
  const [hasil, setHasil] = useState<{ nilai: number; tipe: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const rumusAktif = DAFTAR_RUMUS[indexAktif];

  // Fungsi Transisi Animasi Berjalan dari Kiri ke Kanan
  const jalanKeKartu = (targetIndex: number, arah: 'kiri' | 'kanan') => {
    setHasil(null);
    const offsetAwal = arah === 'kanan' ? -100 : 100;

    animX.setValue(offsetAwal);
    setIndexAktif(targetIndex);

    Animated.timing(animX, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const kartuBerikutnya = () => {
    const next = (indexAktif + 1) % DAFTAR_RUMUS.length;
    jalanKeKartu(next, 'kanan');
  };

  const kartuSebelumnya = () => {
    const prev = (indexAktif - 1 + DAFTAR_RUMUS.length) % DAFTAR_RUMUS.length;
    jalanKeKartu(prev, 'kiri');
  };

  // Eksekusi API Backend FastAPI
  const hitung = async () => {
    setLoading(true);
    setHasil(null);

    let endpoint = '';
    let payload = {};
    let tipeRes = 'cm²';

    if (rumusAktif.id === 'triangle') {
      endpoint = `${API_URL}/triangle`;
      payload = { alas: parseFloat(alas), tinggi: parseFloat(tinggi) };
    } else if (rumusAktif.id === 'cylinder') {
      endpoint = `${API_URL}/cylinder`;
      payload = { radius: parseFloat(radius), tinggi: parseFloat(tinggiTabung) };
      tipeRes = 'cm³ (Volume)';
    } else if (rumusAktif.id === 'square') {
      endpoint = `${API_URL}/square`;
      payload = { sisi: parseFloat(sisi) };
    } else if (rumusAktif.id === 'circle') {
      endpoint = `${API_URL}/circle`;
      payload = { radius: parseFloat(radius) };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setHasil({
          nilai: data.area !== undefined ? data.area : data.volume,
          tipe: tipeRes,
        });
      } else {
        Alert.alert('Error', data.detail?.[0]?.msg || 'Gagal menghitung');
      }
    } catch (error) {
      Alert.alert('Koneksi Gagal', 'Pastikan backend FastAPI sedang berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleSection}>MATHEMATICS MODULES</Text>

      {/* KONTROL KIRI DAN KANAN */}
      <View style={styles.carouselWrapper}>
        <TouchableOpacity style={styles.btnNav} onPress={kartuSebelumnya}>
          <Text style={styles.btnNavText}>‹</Text>
        </TouchableOpacity>

        {/* KARTU DENGAN ANIMASI HORIZONTAL */}
        <Animated.View
          style={[
            styles.cardMain,
            {
              transform: [{ translateX: animX }],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{rumusAktif.pembuat.toUpperCase()}</Text>
            </View>
            <Text style={styles.formulaText}>{rumusAktif.formula}</Text>
          </View>

          <Text style={styles.cardTitle}>{rumusAktif.judul}</Text>

          {/* FORM INPUT RUMUS */}
          <View style={styles.formContainer}>
            {rumusAktif.id === 'triangle' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Nilai Alas (cm)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={alas}
                  onChangeText={setAlas}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nilai Tinggi (cm)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={tinggi}
                  onChangeText={setTinggi}
                />
              </>
            )}

            {rumusAktif.id === 'cylinder' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Jari-jari Radius (r)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={radius}
                  onChangeText={setRadius}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tinggi Tabung (t)"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={tinggiTabung}
                  onChangeText={setTinggiTabung}
                />
              </>
            )}

            {rumusAktif.id === 'square' && (
              <TextInput
                style={styles.input}
                placeholder="Panjang Sisi (s)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={sisi}
                onChangeText={setSisi}
              />
            )}

            {rumusAktif.id === 'circle' && (
              <TextInput
                style={styles.input}
                placeholder="Jari-jari Lingkaran (r)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={radius}
                onChangeText={setRadius}
              />
            )}

            <TouchableOpacity style={styles.btnCalculate} onPress={hitung} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Hitung via API</Text>
              )}
            </TouchableOpacity>

            {hasil !== null && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Hasil Perhitungan:</Text>
                <Text style={styles.resultValue}>
                  {hasil.nilai} {hasil.tipe}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        <TouchableOpacity style={styles.btnNav} onPress={kartuBerikutnya}>
          <Text style={styles.btnNavText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* INDIKATOR DOTS LOOPING */}
      <View style={styles.dotsRow}>
        {DAFTAR_RUMUS.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => jalanKeKartu(i, i > indexAktif ? 'kanan' : 'kiri')}
            style={[styles.dot, i === indexAktif && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleSection: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  btnNav: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  btnNavText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  cardMain: {
    width: '80%',
    maxWidth: 460,
    backgroundColor: '#09090b',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#d6c9cb',
    shadowColor: '#ece6e7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagBadge: {
    backgroundColor: '#FF1236',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  formulaText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  formContainer: {
    gap: 10,
  },
  input: {
    backgroundColor: '#18181b',
    color: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  btnCalculate: {
    backgroundColor: '#FF1236',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  resultCard: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultLabel: {
    color: '#4ade80',
    fontSize: 11,
  },
  resultValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#71717a',
  },
  dotActive: {
    backgroundColor: '#fcf8f9',
    width: 22,
  },
});