import { getFullWidth } from '@/lib/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import BottomSheetContent from './components/bottom-sheet-content';
import LayoutWrapper from './components/layout-wrapper';
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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

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
    <LayoutWrapper
      bottomSheetRef={bottomSheetRef}
      bottomSheetContent={
        <BottomSheetContent bottomSheetClose={() => handleClosePress()} />
      }
    >
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={20}
        className="flex-1 pb-6"
      >
        <View className="flex-1 gap-10">
          <View className="px-6 pt-[3rem]">
            <Tabs page={page} authPages={AUTH_PAGES} onGoToPage={goToPage} />
          </View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
          >
            <SignIn onOpenBottomSheet={() => handleOpenPress()} />
            <SignUp />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </LayoutWrapper>
  );
};

export default AuthScreen;
