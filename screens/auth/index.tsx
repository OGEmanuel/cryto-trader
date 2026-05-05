import { getFullWidth } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from './assets/icons/close-icon.svg';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Tabs from './tabs';

const AUTH_PAGES = [
  {
    id: 1,
    name: 'Sign in',
  },
  {
    id: 2,
    name: 'Sign up',
  },
];

const AuthScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const position = e.nativeEvent.contentOffset.x;
    setPage(Math.round(position / getFullWidth()));
  };

  const scrollToPage = (index: number): void => {
    scrollRef.current?.scrollTo({
      x: index * getFullWidth(),
      animated: true,
    });
  };

  const goToPage = (page: number): void => {
    setPage(page);
    scrollToPage(page);
  };

  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('./assets/img/Background.png')}
        className="absolute size-full"
      />
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        <View className="gap-10">
          <View className="gap-[2.125rem] px-6">
            <Pressable
              onPress={() => router.back()}
              className="active:opacity-75"
            >
              <View className="size-11 items-center justify-center">
                <CloseIcon />
              </View>
            </Pressable>
            <Tabs page={page} authPages={AUTH_PAGES} onGoToPage={goToPage} />
          </View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
          >
            <SignIn />
            <SignUp />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
