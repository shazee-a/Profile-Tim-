import { Ionicons } from '@expo/vector-icons';
import {
  Image, ImageSourcePropType, Pressable, StyleSheet,
  Text, useWindowDimensions, View,
} from 'react-native';
import { ukuranRoda } from './Roda';
import { WARNA } from './theme';

type MemberCardProps = {
  foto: ImageSourcePropType | any; // Fleksibel untuk require() lokal maupun URL online
  nama: string;
  peran: string;
  onPress: () => void;
};

type NamaIkon = keyof typeof Ionicons.glyphMap;

function pilihIkon(peran: string): NamaIkon {
  const p = peran.toLowerCase().replace(/[-\s]/g, '');
  if (p.includes('backend')) return 'server-outline';
  if (p.includes('frontend')) return 'browsers-outline';
  return 'person-outline';
}

export default function MemberCard({ foto, nama, peran, onPress }: MemberCardProps) {
  const { width } = useWindowDimensions();
  const { lebarKartu, tinggiKartu } = ukuranRoda(width);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.kartu,
        { width: lebarKartu, height: tinggiKartu },
        pressed && { opacity: 0.85 },
      ]}
    >
      {/* WADAH FOTO FLEKSIBEL: Menjaga posisi foto tetap pas & simetris di tengah kartu */}
      <View style={styles.wadahFoto}>
        <Image 
          source={typeof foto === 'string' ? { uri: foto } : foto} 
          resizeMode="cover" 
          style={styles.foto} 
        />
      </View>

      {/* BILAH HITAM DI BAWAH: Nama & Peran */}
      <View style={styles.bilah}>
        <Text style={[styles.nama, { fontSize: Math.max(11, lebarKartu * 0.095) }]} numberOfLines={1}>
          {nama.toUpperCase()}
        </Text>
        <View style={styles.barisPeran}>
          <Ionicons name={pilihIkon(peran)} size={12} color={WARNA.aksen} />
          <Text style={styles.teksPeran} numberOfLines={1}>{peran}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kartu: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: WARNA.kartu,
    backgroundColor: '#1E1E1E',
    elevation: 6,
  },
  wadahFoto: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  bilah: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(11,11,11,0.85)',
    paddingVertical: 8, 
    paddingHorizontal: 10,
    zIndex: 5,
  },
  nama: { 
    color: WARNA.teksPutih, 
    fontWeight: '900', 
    letterSpacing: 1 
  },
  barisPeran: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
    marginTop: 2 
  },
  teksPeran: { 
    flexShrink: 1, 
    color: '#DADADA', 
    fontSize: 11, 
    fontWeight: '600' 
  },
});