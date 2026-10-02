/**
 * ============================================================
 * MemberDetailModal.tsx  —  POP-UP DETAIL PROFIL (DI TENGAH LAYAR)
 * ============================================================
 * Muncul saat tombol "Lihat Profil" ditekan. Berupa kartu putih
 * di tengah layar dengan latar belakang gelap transparan.
 * Isinya menampilkan ketiga unsur tugas:
 *   1. GAMBAR : foto
 *   2. TEKS   : nama, peran, deskripsi diri, hobi, skill
 *   3. VIDEO  : video perkenalan (jika sudah tersedia)
 *
 * Cara menutup pop-up:
 *   - tekan tombol "Tutup", atau
 *   - tekan area gelap di luar kartu putih.
 *
 * Props:
 *  - tampil   : true = pop-up terbuka, false = tertutup
 *  - onTutup  : fungsi untuk menutup pop-up
 *  - profil   : objek data anggota (lihat tipe ProfilAnggota)
 */
import {
  Image, ImageSourcePropType, Modal, Pressable,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import VideoPlayer from './VideoPlayer';
import { WARNA } from './theme';

/** Bentuk data yang WAJIB diisi tiap anggota */
export type ProfilAnggota = {
  nama: string;
  peran: string;
  deskripsi: string;
  hobi: string;
  skill: string[];
  foto: ImageSourcePropType;
  video: number | null; // isi null jika video belum ada
};

type Props = {
  tampil: boolean;
  onTutup: () => void;
  profil: ProfilAnggota;
};

// Warna teks di dalam kartu putih. Dibuat tetap (gelap) supaya
// selalu terbaca jelas di atas putih, apa pun tema yang dipilih.
const TEKS_GELAP = '#222222';
const TEKS_PUDAR = '#666666';

export default function MemberDetailModal({ tampil, onTutup, profil }: Props) {
  return (
    <Modal
      visible={tampil}
      transparent                 // latar modal tembus pandang (bukan layar penuh)
      animationType="fade"        // muncul perlahan
      statusBarTranslucent        // Android: gelapnya sampai ke status bar
      onRequestClose={onTutup}    // tombol Back di Android menutup pop-up
    >
      {/* LAPISAN GELAP: memenuhi layar dan menengahkan kartu */}
      <View style={styles.latarGelap}>
        {/* Area gelap yang bisa ditekan untuk menutup pop-up */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onTutup} />

        {/* KARTU PUTIH di tengah layar */}
        <View style={styles.kartu}>
          <ScrollView
            style={styles.gulir}
            contentContainerStyle={styles.isi}
            showsVerticalScrollIndicator={false}
          >
            {/* ---------- UNSUR GAMBAR ---------- */}
            <Image source={profil.foto} style={styles.foto} resizeMode="cover" />

            {/* ---------- UNSUR TEKS ---------- */}
            <Text style={styles.nama}>{profil.nama}</Text>
            <Text style={styles.peran}>{profil.peran}</Text>

            <Text style={styles.label}>Tentang Saya</Text>
            <Text style={styles.teks}>{profil.deskripsi}</Text>

            <Text style={styles.label}>Hobi</Text>
            <Text style={styles.teks}>{profil.hobi}</Text>

            <Text style={styles.label}>Skill</Text>
            <View style={styles.baris}>
              {profil.skill.map((s) => (
                <View key={s} style={styles.lencana}>
                  <Text style={styles.teksLencana}>{s}</Text>
                </View>
              ))}
            </View>

            {/* ---------- UNSUR VIDEO ---------- */}
            <Text style={styles.label}>Video Perkenalan</Text>
            {profil.video ? (
              <VideoPlayer sumber={profil.video} />
            ) : (
              <Text style={styles.teksPudar}>Video belum tersedia.</Text>
            )}
          </ScrollView>

          {/* TOMBOL TUTUP (tetap terlihat di bawah kartu) */}
          <Pressable
            style={({ pressed }) => [styles.tombolTutup, pressed && { opacity: 0.8 }]}
            onPress={onTutup}
          >
            <Text style={styles.teksTutup}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Latar gelap transparan; alignItems + justifyContent = kartu di TENGAH
  latarGelap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Kartu putih. maxHeight membatasi tinggi, isi yang panjang bisa digulir
  kartu: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
  },
  gulir: { flexGrow: 0 },
  isi: { paddingBottom: 8 },
  foto: {
    width: 160,
    height: 213,               // perbandingan 3:4
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: 14,
  },
  nama: { fontSize: 24, fontWeight: '800', color: TEKS_GELAP, textAlign: 'center' },
  peran: {
    fontSize: 14, fontWeight: '600', color: WARNA.utama,
    textAlign: 'center', marginBottom: 6,
  },
  label: { fontSize: 15, fontWeight: '700', color: WARNA.utama, marginTop: 14, marginBottom: 4 },
  teks: { fontSize: 14, lineHeight: 21, color: TEKS_GELAP },
  teksPudar: { color: TEKS_PUDAR },
  baris: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  lencana: {
    backgroundColor: WARNA.garis,
    paddingVertical: 5, paddingHorizontal: 12, borderRadius: 16,
  },
  teksLencana: { color: TEKS_GELAP, fontWeight: '600', fontSize: 13 },
  tombolTutup: {
    backgroundColor: WARNA.utama,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  teksTutup: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});