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
  peran: 'Database & Backend Stability Specialist', // TODO: ganti dengan peran sebenarnya
  deskripsi:
    'Bertanggung jawab penuh dalam merancang dan mengelola arsitektur database, mengoptimalkan penanganan error (error handling) pada backend untuk menjamin stabilitas sistem, serta mengelola framework dan integrasi package library API agar seluruh ekosistem aplikasi berjalan dengan lancar.',
  hobi: 'Mendengarkan musik, membaca buku, dan bermain gitar',
  KeahlianDanFokusProjek: [
    'Database Management & Optimization',
    'Advanced Backend Error Handling',
    'Framework & API Package Management',
    'System Reliability & Dependency Control'
  ],
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
