import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from './assets/icons/close-icon.svg';

const AuthScreen = () => {
  const router = useRouter();
  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('./assets/img/Background.png')}
        className="absolute size-full"
      />
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        <Pressable
          onPress={() => router.back()}
          className="px-6 active:opacity-75"
        >
          <View className="size-11 items-center justify-center">
            <CloseIcon />
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
