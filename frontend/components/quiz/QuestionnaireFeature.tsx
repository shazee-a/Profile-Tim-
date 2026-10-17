import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const API_BASE = 'http://localhost:8000/api/v1';

const SPORT_ICONS: { [key: string]: string } = {
  Badminton: '🏸',
  Catur: '♟️',
  Padel: '🎾',
  Basket: '🏀',
  'Lari Marathon': '🏃‍♂️',
};

interface QuizProps {
  soalList: any[];
  setSoalList: React.Dispatch<React.SetStateAction<any[]>>;
  currentSoalIdx: number;
  setCurrentSoalIdx: React.Dispatch<React.SetStateAction<number>>;
  selectedAnswers: { [key: number]: number[] };
  setSelectedAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: number[] }>>;
  feedback: { [key: number]: any };
  setFeedback: React.Dispatch<React.SetStateAction<{ [key: number]: any }>>;
  featureMode: 'quiz' | 'polling';
  setFeatureMode: React.Dispatch<React.SetStateAction<'quiz' | 'polling'>>;
  selectedSports: string[];
  setSelectedSports: React.Dispatch<React.SetStateAction<string[]>>;
  chartImage: string;
  setChartImage: React.Dispatch<React.SetStateAction<string>>;
  voted: boolean;
  setVoted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuestionnaireFeature({
  soalList,
  setSoalList,
  currentSoalIdx,
  setCurrentSoalIdx,
  selectedAnswers,
  setSelectedAnswers,
  feedback,
  setFeedback,
  featureMode,
  setFeatureMode,
  selectedSports,
  setSelectedSports,
  chartImage,
  setChartImage,
  voted,
  setVoted,
}: QuizProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Deteksi tampilan layar HP

  const [loadingChart, setLoadingChart] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (soalList.length === 0) fetchQuestions();
    fetchPollingData();

    // Auto update chart real-time tiap 3 detik
    const interval = setInterval(() => {
      fetchPollingDataSilently();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${API_BASE}/questionnaire/questions`);
      if (res.ok) {
        const data = await res.json();
        setSoalList(data.questions || []);
      }
    } catch (err) {
      console.log('Backend belum aktif');
    }
  };

  const fetchPollingData = async () => {
    setLoadingChart(true);
    try {
      const res = await fetch(`${API_BASE}/polling/chart`);
      if (res.ok) {
        const data = await res.json();
        setChartImage(data.chart_image || '');
      }
    } catch (err) {
      console.log('Gagal fetch chart');
    } finally {
      setLoadingChart(false);
    }
  };

  const fetchPollingDataSilently = async () => {
    try {
      const res = await fetch(`${API_BASE}/polling/chart`);
      if (res.ok) {
        const data = await res.json();
        setChartImage(data.chart_image || '');
      }
    } catch (err) {
      // ignore
    }
  };

  const handleSelectOption = (soalId: number, optionIdx: number, tipe: string) => {
    setSelectedAnswers((prev) => {
      const current = prev[soalId] || [];
      if (tipe === 'single') {
        return { ...prev, [soalId]: [optionIdx] };
      } else {
        return current.includes(optionIdx)
          ? { ...prev, [soalId]: current.filter((i) => i !== optionIdx) }
          : { ...prev, [soalId]: [...current, optionIdx] };
      }
    });
  };

  const handleToggleSport = (sport: string) => {
    if (voted) return;
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleVerifyAnswer = async (soalId: number) => {
    const pilihanUser = selectedAnswers[soalId] || [];
    if (pilihanUser.length === 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu jawaban!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/questionnaire/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soal_id: soalId, pilihan_user: pilihanUser }),
      });
      const data = await res.json();
      setFeedback((prev) => ({ ...prev, [soalId]: data }));
    } catch (err) {
      Alert.alert('Koneksi Gagal', 'Pastikan backend FastAPI sedang berjalan.');
    }
  };

  const handleVote = async () => {
    if (selectedSports.length === 0) {
      Alert.alert('Perhatian', 'Pilih minimal satu olahraga!');
      return;
    }
    setLoadingChart(true);
    try {
      const res = await fetch(`${API_BASE}/polling/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ olahraga: selectedSports }),
      });
      const data = await res.json();
      setChartImage(data.chart_image);
      setVoted(true);
      Alert.alert('Sukses', 'Vote Anda berhasil dicatat!');
    } catch (err) {
      Alert.alert('Koneksi Gagal', 'Gagal mengirimkan vote ke server.');
    } finally {
      setLoadingChart(false);
    }
  };

  const currentSoal = soalList[currentSoalIdx];

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.sectionTitleHeader}>
        {featureMode === 'quiz' ? 'Kuesioner Bangun Datar' : 'Polling Hobi Olahraga'}
      </Text>

      {/* STRUKTUR CAROUSEL UTAMA: HANYA MEMBERIKAN RUANG UNTUK [PANAH KIRI - AREA KONTEN - PANAH KANAN] */}
      <View style={styles.carouselWrapper}>
        {/* PANAH NAVIGASI KIRI STABIL */}
        <TouchableOpacity
          // @ts-ignore
          onMouseEnter={() => setHoveredItem('prev-feature')}
          onMouseLeave={() => setHoveredItem(null)}
          style={[
            styles.btnNav,
            hoveredItem === 'prev-feature' && featureMode !== 'quiz' && styles.btnZoomIn,
            featureMode === 'quiz' && styles.btnNavDisabled,
          ]}
          disabled={featureMode === 'quiz'}
          onPress={() => setFeatureMode('quiz')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnNavText}>‹</Text>
        </TouchableOpacity>

        {/* AREA KONTEN TERTUTUP (TIDAK MEMENGARUHI POSISI PANAH) */}
        <View style={styles.contentAreaContainer}>
          {featureMode === 'quiz' ? (
            <View style={styles.cardMain}>
              {soalList.length === 0 ? (
                <Text style={styles.soalText}>
                  Menghubungkan ke backend untuk mengambil kuesioner...
                </Text>
              ) : (
                <>
                  <View style={styles.matrixWrapper}>
                    <Text style={styles.matrixLabel}>Daftar Soal:</Text>
                    <View style={styles.matrixGrid}>
                      {soalList.map((s, idx) => {
                        const isActive = idx === currentSoalIdx;
                        const isAnswered = (selectedAnswers[s.id] || []).length > 0;
                        const isVerified = feedback[s.id] !== undefined;

                        return (
                          <TouchableOpacity
                            key={s.id}
                            onPress={() => setCurrentSoalIdx(idx)}
                            style={[
                              styles.matrixItemSolid,
                              isAnswered && styles.matrixItemAnsweredSolid,
                              isVerified &&
                                (feedback[s.id].is_correct
                                  ? styles.matrixItemCorrectSolid
                                  : styles.matrixItemWrongSolid),
                              isActive && styles.matrixItemActiveSolid,
                            ]}
                            activeOpacity={0.85}
                          >
                            <Text
                              style={[
                                styles.matrixText,
                                (isActive || isAnswered || isVerified) && styles.matrixTextActive,
                              ]}
                            >
                              {idx + 1}
                            </Text>
                            {isVerified && (
                              <View style={styles.badgeCheckIcon}>
                                <Text style={styles.textCheckIcon}>✓</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {currentSoal && (
                    <View>
                      <Text style={styles.soalBadge}>
                        Soal {currentSoalIdx + 1} dari {soalList.length} •{' '}
                        {currentSoal.tipe === 'single' ? 'Pilihan Tunggal' : 'Pilihan Ganda (>1)'}
                      </Text>
                      <Text style={styles.soalText}>{currentSoal.pertanyaan}</Text>

                      {currentSoal.pilihan.map((p: string, pIdx: number) => {
                        const userChoice = selectedAnswers[currentSoal.id] || [];
                        const isSelected = userChoice.includes(pIdx);
                        const optionKey = `soal-${currentSoal.id}-${pIdx}`;
                        const isHovered = hoveredItem === optionKey;

                        return (
                          <TouchableOpacity
                            key={pIdx}
                            // @ts-ignore
                            onMouseEnter={() => setHoveredItem(optionKey)}
                            onMouseLeave={() => setHoveredItem(null)}
                            activeOpacity={0.9}
                            style={[
                              styles.optionCard,
                              isSelected && styles.optionSelected,
                              isHovered && styles.optionHovered,
                            ]}
                            onPress={() => handleSelectOption(currentSoal.id, pIdx, currentSoal.tipe)}
                          >
                            <Text
                              style={[
                                styles.optionText,
                                isSelected && styles.optionTextSelected,
                              ]}
                            >
                              {String.fromCharCode(65 + pIdx)}. {p}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}

                      <TouchableOpacity
                        // @ts-ignore
                        onMouseEnter={() => setHoveredItem('btn-cek')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={[
                          styles.btnCek,
                          hoveredItem === 'btn-cek' && styles.btnZoomIn,
                        ]}
                        onPress={() => handleVerifyAnswer(currentSoal.id)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.btnCekText}>Cek Jawaban</Text>
                      </TouchableOpacity>

                      {feedback[currentSoal.id] && (
                        <View
                          style={[
                            styles.feedbackBox,
                            {
                              backgroundColor: feedback[currentSoal.id].is_correct
                                ? '#052e16'
                                : '#450a0a',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.feedbackTitle,
                              {
                                color: feedback[currentSoal.id].is_correct
                                  ? '#4ade80'
                                  : '#f87171',
                              },
                            ]}
                          >
                            {feedback[currentSoal.id].is_correct
                              ? '✅ JAWABAN BENAR!'
                              : '❌ JAWABAN SALAH!'}
                          </Text>
                          <Text style={styles.feedbackDetail}>
                            {feedback[currentSoal.id].penjelasan}
                          </Text>
                        </View>
                      )}

                      <View style={styles.navRow}>
                        <TouchableOpacity
                          // @ts-ignore
                          onMouseEnter={() => setHoveredItem('btn-prev-page')}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={[
                            styles.btnNavPage,
                            hoveredItem === 'btn-prev-page' && currentSoalIdx !== 0 && styles.btnZoomIn,
                            currentSoalIdx === 0 && styles.btnNavDisabled,
                          ]}
                          disabled={currentSoalIdx === 0}
                          onPress={() => setCurrentSoalIdx((prev) => Math.max(0, prev - 1))}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.btnNavPageText}>‹ Sebelumnya</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          // @ts-ignore
                          onMouseEnter={() => setHoveredItem('btn-next-page')}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={[
                            styles.btnNavPage,
                            hoveredItem === 'btn-next-page' && currentSoalIdx !== soalList.length - 1 && styles.btnZoomIn,
                            currentSoalIdx === soalList.length - 1 && styles.btnNavDisabled,
                          ]}
                          disabled={currentSoalIdx === soalList.length - 1}
                          onPress={() =>
                            setCurrentSoalIdx((prev) => Math.min(soalList.length - 1, prev + 1))
                          }
                          activeOpacity={0.85}
                        >
                          <Text style={styles.btnNavPageText}>Selanjutnya ›</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          ) : (
            /* RESPONSIVE LAYOUT DARI POLLING + PIE CHART */
            <View style={[styles.pollingLayout, isMobile && styles.pollingLayoutMobile]}>
              <View style={[styles.cardMain, isMobile && styles.cardMainMobile]}>
                <Text style={styles.sectionHeaderInner}>Polling Hobi Olahraga</Text>
                <Text style={styles.subTitle}>Pilih satu atau lebih olahraga favorit Anda:</Text>

                {['Badminton', 'Catur', 'Padel', 'Basket', 'Lari Marathon'].map((sport) => {
                  const isSelected = selectedSports.includes(sport);
                  const isHovered = hoveredItem === sport;

                  return (
                    <TouchableOpacity
                      key={sport}
                      // @ts-ignore
                      onMouseEnter={() => setHoveredItem(sport)}
                      onMouseLeave={() => setHoveredItem(null)}
                      activeOpacity={0.9}
                      style={[
                        styles.optionCard,
                        isSelected && styles.optionSelected,
                        isHovered && styles.optionHovered,
                      ]}
                      onPress={() => handleToggleSport(sport)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {SPORT_ICONS[sport]}  {sport}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity
                  // @ts-ignore
                  onMouseEnter={() => setHoveredItem('btn-vote')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={[
                    styles.btnVote,
                    hoveredItem === 'btn-vote' && styles.btnZoomIn,
                  ]}
                  onPress={handleVote}
                  disabled={voted}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnCekText}>
                    {voted ? 'Vote Berhasil Disimpan' : 'Submit Vote'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* PIE CHART TERISOLASI (BERADA DI SAMPING DI WEB / DI BAWAH DI MOBILE) */}
              {chartImage !== '' && (
                <View style={[styles.sideChartClean, isMobile && styles.sideChartCleanMobile]}>
                  {loadingChart ? (
                    <ActivityIndicator color="#FF1236" size="large" />
                  ) : (
                    <Image
                      source={{ uri: chartImage }}
                      style={[styles.chartImgSide, isMobile && styles.chartImgSideMobile]}
                      resizeMode="contain"
                    />
                  )}
                </View>
              )}
            </View>
          )}
        </View>

        {/* PANAH NAVIGASI KANAN STABIL */}
        <TouchableOpacity
          // @ts-ignore
          onMouseEnter={() => setHoveredItem('next-feature')}
          onMouseLeave={() => setHoveredItem(null)}
          style={[
            styles.btnNav,
            hoveredItem === 'next-feature' && featureMode !== 'polling' && styles.btnZoomIn,
            featureMode === 'polling' && styles.btnNavDisabled,
          ]}
          disabled={featureMode === 'polling'}
          onPress={() => setFeatureMode('polling')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnNavText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { width: '100%', alignItems: 'center' },
  sectionTitleHeader: { fontSize: 18, fontWeight: '900', color: '#111827', textAlign: 'center', marginBottom: 14, letterSpacing: 0.5 },
  
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 6,
  },
  btnNav: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  btnNavText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  btnNavDisabled: { opacity: 0.2 },
  
  btnZoomIn: {
    transform: [{ scale: 1.05 }],
    boxShadow: '0px 4px 12px rgba(255, 18, 54, 0.4)',
  },

  contentAreaContainer: {
    flex: 1,
    maxWidth: 720,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardMain: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#09090b',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#27272a',
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
    elevation: 6,
  },
  cardMainMobile: {
    maxWidth: '100%',
    padding: 14,
  },
  
  pollingLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
  },
  pollingLayoutMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  sideChartClean: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideChartCleanMobile: {
    marginTop: 12,
  },
  chartImgSide: { width: 250, height: 230 },
  chartImgSideMobile: { width: 220, height: 200 },
  
  matrixWrapper: { marginBottom: 14, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  matrixLabel: { fontSize: 11, fontWeight: '700', color: '#A1A1AA', marginBottom: 6 },
  matrixGrid: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },

  matrixItemSolid: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#18181b',
    borderWidth: 1.5,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  matrixItemAnsweredSolid: { backgroundColor: '#27272a', borderColor: '#3f3f46' },
  matrixItemCorrectSolid: { backgroundColor: '#052e16', borderColor: '#22c55e' },
  matrixItemWrongSolid: { backgroundColor: '#450a0a', borderColor: '#ef4444' },
  matrixItemActiveSolid: { borderColor: '#FF1236', borderWidth: 2, transform: [{ scale: 1.05 }] },
  badgeCheckIcon: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCheckIcon: { color: '#ffffff', fontSize: 8, fontWeight: '900' },

  matrixText: { fontSize: 11, fontWeight: '700', color: '#A1A1AA' },
  matrixTextActive: { color: '#FFFFFF', fontWeight: '800' },
  soalBadge: { color: '#FF1236', fontSize: 10, fontWeight: '800', marginBottom: 6, letterSpacing: 0.5 },
  soalText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', marginBottom: 12, lineHeight: 18 },
  optionCard: { backgroundColor: '#18181b', padding: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#27272a', marginBottom: 6, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
  optionHovered: { borderColor: '#FF1236', boxShadow: '0px 4px 12px rgba(255, 18, 54, 0.35)', transform: [{ translateY: -1 }] },
  optionSelected: { backgroundColor: '#FF1236', borderColor: '#FF1236' },
  optionText: { color: '#E4E4E7', fontSize: 12, fontWeight: '600' },
  optionTextSelected: { color: '#FFFFFF', fontWeight: '800' },
  btnCek: { backgroundColor: '#27272a', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginTop: 6 },
  btnVote: { backgroundColor: '#FF1236', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnCekText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12, letterSpacing: 0.5 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#27272a' },
  btnNavPage: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#18181b', borderWidth: 1, borderColor: '#27272a' },
  btnNavPageText: { color: '#FF1236', fontWeight: '800', fontSize: 11 },
  feedbackBox: { marginTop: 10, padding: 10, borderRadius: 8 },
  feedbackTitle: { fontWeight: '800', fontSize: 11 },
  feedbackDetail: { color: '#E4E4E7', fontSize: 11, marginTop: 2, lineHeight: 16 },
  sectionHeaderInner: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  subTitle: { color: '#A1A1AA', fontSize: 11, marginBottom: 10 },
});