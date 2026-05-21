import TextCustom from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

const SectionHeader = () => {
  return (
    <View className="relative items-center gap-6 overflow-hidden py-8">
      <View className="absolute bottom-0 h-full w-full">
        <LinearGradient
          colors={['rgba(94, 213, 168, 0.05)', 'rgba(27, 35, 42, 0)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          className="size-full"
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      </View>
      <View className="flex-row items-center gap-5">
        <TextCustom className="text-sm/6 text-secondary">USD</TextCustom>
        <TextCustom className="font-nm-bold text-sm/6 text-primary">
          BITS
        </TextCustom>
      </View>
      <TextCustom className="font-nm-bold text-[1.75rem]/7 text-white">
        BTC 40,059.83
      </TextCustom>
    </View>
  );
};

export default SectionHeader;
