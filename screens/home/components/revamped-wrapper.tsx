import ArrowIcon from '@/assets/icons/arrow-icon.svg';
import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Href, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomLeftShape from '../assets/icons/bl-shape.svg';
import TopRightShape from '../assets/icons/tr-shape.svg';

const RevampedWrapper = (props: {
  children: React.ReactNode;
  header: string;
  description?: string;
  goBackTo?: Href;
  bottomSheetRef?: React.RefObject<BottomSheetMethods | null>;
  bottomSheetContent?: React.ReactNode;
}) => {
  const {
    children,
    header,
    description,
    goBackTo,
    bottomSheetRef,
    bottomSheetContent,
  } = props;
  const snapPoints = useMemo(() => ['60%', '85%'], []);

  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="relative flex-1 bg-background-secondary">
        <View className="absolute right-0 top-0 z-10">
          <TopRightShape />
        </View>
        <SafeAreaView className="android:mt-12 flex-1 px-6">
          <View className="gap-[14px]">
            {goBackTo && (
              <Pressable
                onPress={() => router.push(goBackTo)}
                className="active:opacity-75"
              >
                <ArrowIcon />
              </Pressable>
            )}
            <TextCustom className="font-nm-bold text-2xl/[130%] text-custom-text-secondary">
              {header}
            </TextCustom>
            {description && (
              <TextCustom className="w-[20.375rem] text-xs/[130%] text-custom-text-tertiary">
                {description}
              </TextCustom>
            )}
          </View>
          <View className="z-20 flex-1">{children}</View>
        </SafeAreaView>
        <View className="absolute bottom-0 left-0 z-10">
          <BottomLeftShape />
        </View>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        index={-1}
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor: Colors.light['background-tertiary'],
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.light['custom-text-secondary'],
        }}
        containerStyle={{
          zIndex: 20,
        }}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          className="h-full flex-grow bg-background-tertiary p-6"
        >
          {bottomSheetContent}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default RevampedWrapper;
