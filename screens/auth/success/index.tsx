import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SuccessIcon from '../assets/icons/success-icon.svg';

const SuccessScreen = () => {
  const router = useRouter();
  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('../assets/img/Background.png')}
        className="absolute size-full"
      />
      <Image
        source={require('../assets/img/glossy.png')}
        className="absolute h-[189.99px] w-[206.51px]"
      />
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        <View className="gap-1 pt-[6.5625rem]">
          <View className="relative items-center">
            <SuccessIcon />
            <View className="absolute bottom-0 h-[9rem] w-full">
              <LinearGradient
                colors={['rgba(27, 35, 42, 0)', Colors.light.background]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="size-full"
                style={{ ...StyleSheet.absoluteFillObject }}
              />
            </View>
          </View>
          <View className="gap-10 px-6">
            <TextCustom className="text-center font-nm-bold text-[2rem]/[2.875rem] text-white">
              Your account has been successfully created!
            </TextCustom>
            <Button label="Get Started" onPress={() => router.push('/home')} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SuccessScreen;
