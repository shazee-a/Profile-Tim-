/**
 * ============================================================
 * ProfilZaky.tsx  —  BAGIAN MILIK ZAKY
 * ============================================================
 * File ini HANYA diedit oleh Zaky.
 * Isinya ada 3 bagian:
 *   A. DATA DIRI   : nama, peran, deskripsi, hobi, skill, foto, video
 *   B. TOMBOL      : state buka/tutup jendela detail
 *   C. TAMPILAN    : kartu + jendela detail
 *
 * YANG HARUS DIISI Zaky: cukup ubah BAGIAN A di bawah.
 * Bagian B dan C tidak perlu diubah.
 *
 * Syarat file:
 *   - Foto  : assets/images/zaky.png  (timpa file placeholder dengan foto asli
 *             dengan nama yang sama; kalau pakai .jpg, ubah juga nama di require)
 *   - Video : assets/videos/zaky.mp4  (setelah file video ada, hapus tanda //
 *             pada baris "video: require(...)" dan hapus baris "video: null")
 */
import { useState } from "react";
import MemberCard from "../MemberCard";
import MemberDetailModal, { ProfilAnggota } from "../MemberDetailModal";

// ======================= A. DATA DIRI =======================
const profil: ProfilAnggota = {
  nama: "Zaky",
  peran: "Front-End Developer", // TODO: ganti dengan peran sebenarnya
  deskripsi:
    "Mahasiswa Informatika angkatan 2024 di Universitas Al Azhar Indonesia yang berfokus pada pengembangan antarmuka aplikasi web dan mobile yang intuitif, responsif, serta menarik secara visual.",
  hobi: "Olahraga, Mendengarkan musik, Bermain musik dan Bermain Game", // TODO: ganti dengan hobi sebenarnya
  KeahlianDanFokusProjek: [
    "React Native & Expo",
    "React.js & Tailwind CSS",
    "UI/UX Design Implementation",
    "JavaScript / TypeScript",
    "Frontend Integration",
  ],
  foto: require("../../assets/images/zaky.png"),
  video: null,
  // video: require('../../assets/videos/zaky.mp4'),
};

// ======================= B + C. TOMBOL & TAMPILAN =======================
export default function ProfilZaky() {
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
