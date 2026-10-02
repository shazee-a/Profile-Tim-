/**
 * ============================================================
 * src/app/_layout.tsx  —  KERANGKA NAVIGASI
 * ============================================================
 * headerShown: false = menghilangkan bilah putih bertuliskan
 * "index" di bagian atas, sehingga tampilan penuh sampai ke
 * atas layar (di web maupun di Android).
 */
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
