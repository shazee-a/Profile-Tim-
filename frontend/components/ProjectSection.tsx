import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import LuasCalculator from './math/LuasCalculator';
import QuestionnaireFeature from './quiz/QuestionnaireFeature';

export default function ProjectSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const [activeMenu, setActiveMenu] = useState<'math' | 'quiz'>('math');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // ===== PERSISTENT STATE UNTUK KUESIONER & POLLING =====
  const [soalList, setSoalList] = useState<any[]>([]);
  const [currentSoalIdx, setCurrentSoalIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number[] }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: any }>({});
  const [featureMode, setFeatureMode] = useState<'quiz' | 'polling'>('quiz');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [chartImage, setChartImage] = useState<string>('');
  const [voted, setVoted] = useState<boolean>(false);

  const animMath = useRef(new Animated.Value(activeMenu === 'math' ? 1 : 0)).current;
  const animQuiz = useRef(new Animated.Value(activeMenu === 'quiz' ? 1 : 0)).current;

  const handleHoverIn = (type: 'math' | 'quiz') => {
    setHoveredMenu(type);
    Animated.timing(type === 'math' ? animMath : animQuiz, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  const handleHoverOut = (type: 'math' | 'quiz') => {
    setHoveredMenu(null);
    if (activeMenu !== type) {
      Animated.timing(type === 'math' ? animMath : animQuiz, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSwitchTab = (type: 'math' | 'quiz') => {
    setActiveMenu(type);
    if (type === 'math') {
      Animated.timing(animMath, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      Animated.timing(animQuiz, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    } else {
      Animated.timing(animQuiz, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      Animated.timing(animMath, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  };

  const widthMathLine = animMath.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const widthQuizLine = animQuiz.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.subNavBar, isMobile && styles.subNavBarMobile]}>
        <TouchableOpacity
          onPress={() => handleSwitchTab('math')}
          // @ts-ignore
          onMouseEnter={() => handleHoverIn('math')}
          onMouseLeave={() => handleHoverOut('math')}
          activeOpacity={0.8}
          style={styles.navButton}
        >
          <Text
            style={[
              styles.navText,
              isMobile && styles.navTextMobile,
              (activeMenu === 'math' || hoveredMenu === 'math') && styles.navTextActive,
            ]}
          >
            Model Mathematics
          </Text>
          <Animated.View style={[styles.lineUnder, { width: widthMathLine, backgroundColor: '#FF1236' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSwitchTab('quiz')}
          // @ts-ignore
          onMouseEnter={() => handleHoverIn('quiz')}
          onMouseLeave={() => handleHoverOut('quiz')}
          activeOpacity={0.8}
          style={styles.navButton}
        >
          <Text
            style={[
              styles.navText,
              isMobile && styles.navTextMobile,
              (activeMenu === 'quiz' || hoveredMenu === 'quiz') && styles.navTextActive,
            ]}
          >
            Questionnaire Feature
          </Text>
          <Animated.View style={[styles.lineUnder, { width: widthQuizLine, backgroundColor: '#FF1236' }]} />
        </TouchableOpacity>
      </View>

      {activeMenu === 'math' ? (
        <LuasCalculator />
      ) : (
        <QuestionnaireFeature
          soalList={soalList}
          setSoalList={setSoalList}
          currentSoalIdx={currentSoalIdx}
          setCurrentSoalIdx={setCurrentSoalIdx}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          feedback={feedback}
          setFeedback={setFeedback}
          featureMode={featureMode}
          setFeatureMode={setFeatureMode}
          selectedSports={selectedSports}
          setSelectedSports={setSelectedSports}
          chartImage={chartImage}
          setChartImage={setChartImage}
          voted={voted}
          setVoted={setVoted}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', paddingTop: 20 },
  subNavBar: { flexDirection: 'row', gap: 24, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  subNavBarMobile: { gap: 8, paddingHorizontal: 10 },
  navButton: { alignItems: 'center', paddingVertical: 4, paddingHorizontal: 6 },
  navText: { fontSize: 13, fontWeight: '600', color: '#6B7280', letterSpacing: 0.8 },
  navTextMobile: { fontSize: 11, letterSpacing: 0.2 },
  navTextActive: { color: '#FF1236', fontWeight: '900' },
  lineUnder: { height: 3, borderRadius: 2, marginTop: 4 },
});