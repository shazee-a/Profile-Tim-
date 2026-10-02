/**
 * ============================================================
 * ProfilShaquilla.tsx  —  BAGIAN MILIK SHAQUILLA
 * ============================================================
 * File ini HANYA diedit oleh Shaquilla.
 * Isinya ada 3 bagian:
 *   A. DATA DIRI   : nama, peran, deskripsi, hobi, skill, foto, video
 *   B. TOMBOL      : state buka/tutup jendela detail
 *   C. TAMPILAN    : kartu + jendela detail
 *
 * YANG HARUS DIISI Shaquilla: cukup ubah BAGIAN A di bawah.
 * Bagian B dan C tidak perlu diubah.
 *
 * Syarat file:
 *   - Foto  : assets/images/shaquilla.png  (timpa file placeholder dengan foto asli
 *             dengan nama yang sama; kalau pakai .jpg, ubah juga nama di require)
 *   - Video : assets/videos/shaquilla.mp4  (setelah file video ada, hapus tanda //
 *             pada baris "video: require(...)" dan hapus baris "video: null")
 */
import { useState } from 'react';
import MemberCard from '../MemberCard';
import MemberDetailModal, { ProfilAnggota } from '../MemberDetailModal';

// ======================= A. DATA DIRI =======================
const profil: ProfilAnggota = {
  nama: 'Shaquilla',
  peran: 'Peran Shaquilla', // TODO: ganti dengan peran sebenarnya
  deskripsi:
    'Tulis deskripsi diri Shaquilla di sini, 2-3 kalimat. Misalnya asal, jurusan, dan tujuan belajar.',
  hobi: 'Tulis hobi di sini',
  skill: ['Skill 1', 'Skill 2', 'Skill 3'],
  foto: require('../../assets/images/shaquilla.png'),
  video: null,
  // video: require('../../assets/videos/shaquilla.mp4'),
};

// ======================= B + C. TOMBOL & TAMPILAN =======================
export default function ProfilShaquilla() {
  // tampil = apakah jendela detail sedang terbuka (awalnya tertutup)
  const [tampil, setTampil] = useState(false);

  return (
    <>
      {/* Kartu di halaman utama; tombolnya membuka jendela detail */}
      <MemberCard
        foto={profil.foto}
        nama={profil.nama}
        peran={profil.peran}
        onPress={() => setTampil(true)}
      />

      {/* Jendela detail: gambar + teks + video */}
      <MemberDetailModal
        tampil={tampil}
        onTutup={() => setTampil(false)}
        profil={profil}
      />
    </>
  );
}
