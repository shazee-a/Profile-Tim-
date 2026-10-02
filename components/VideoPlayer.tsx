/**
 * ============================================================
 * VideoPlayer.tsx  —  PEMUTAR VIDEO PERKENALAN
 * ============================================================
 * Memakai library expo-video (sudah dipasang dengan
 * `npx expo install expo-video`).
 *
 * Props:
 *  - sumber : video dari require('../assets/videos/nama.mp4')
 *
 * Catatan: komponen ini dipakai DI DALAM jendela detail
 * (MemberDetailModal), jadi video hanya dibuat saat jendelanya
 * dibuka dan otomatis berhenti saat ditutup.
 */
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';

type VideoPlayerProps = {
  sumber: number; // require(...) menghasilkan angka (id file)
};

export default function VideoPlayer({ sumber }: VideoPlayerProps) {
  // Membuat "pemutar" untuk sumber video ini
  const player = useVideoPlayer(sumber, (p) => {
    p.loop = false; // video tidak diulang otomatis
  });

  return (
    <VideoView
      player={player}
      style={styles.video}
      nativeControls      // tombol putar/jeda/geser bawaan
      allowsFullscreen    // boleh layar penuh
    />
  );
}

const styles = StyleSheet.create({
  video: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#000' },
});
