/**
 * ============================================================
 * ProfilFadli.tsx  —  BAGIAN MILIK FADLI
 * ============================================================
 * File ini HANYA diedit oleh Fadli.
 * Isinya ada 3 bagian:
 *   A. DATA DIRI   : nama, peran, deskripsi, hobi, skill, foto, video
 *   B. TOMBOL      : state buka/tutup jendela detail
 *   C. TAMPILAN    : kartu + jendela detail
 *
 * YANG HARUS DIISI Fadli: cukup ubah BAGIAN A di bawah.
 * Bagian B dan C tidak perlu diubah.
 *
 * Syarat file:
 *   - Foto  : assets/images/fadli.png  (timpa file placeholder dengan foto asli
 *             dengan nama yang sama; kalau pakai .jpg, ubah juga nama di require)
 *   - Video : assets/videos/fadli.mp4  (setelah file video ada, hapus tanda //
 *             pada baris "video: require(...)" dan hapus baris "video: null")
 */
import { useState } from 'react';
import MemberCard from '../MemberCard';
import MemberDetailModal, { ProfilAnggota } from '../MemberDetailModal';

// ======================= A. DATA DIRI =======================
const profil: ProfilAnggota = {
  nama: 'Fadli Ghafatul Hijriah',
  peran: 'Backend & AI Lead',
  deskripsi:
    'Bertanggung jawab merancang arsitektur backend, membangun API, serta mengintegrasikan solusi AI ke dalam aplikasi. Selain itu, saya juga Memastikan proyek selesai tepat waktu dan Membantu tim menerapkan kerangka kerja Agile/Scrum.',
  hobi: 'Makan, Main Game, Main Gitar',
  KeahlianDanFokusProjek: [
    'Backend & REST API Design',
    'AI & Machine Learning Integration',
    'Git & Version Control Management',
    'System Architecture & Refactoring',
  ],
  foto: require('../../assets/images/fadli.png'),
  video: null,
  // video: require('../../assets/videos/fadli.mp4'),
};

// ======================= B + C. TOMBOL & TAMPILAN =======================
export default function ProfilFadli() {
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
