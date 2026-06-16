import { Colors } from '@/constants/theme';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LayoutWrapper = (props: {
  children: React.ReactNode;
  bottomSheetRef?: React.RefObject<BottomSheetMethods | null>;
  bottomSheetContent?: React.ReactNode;
}) => {
  const { children, bottomSheetRef, bottomSheetContent } = props;

  return (
    <View className="relative flex-1">
      <ImageBackground
        source={require('../assets/img/Background.png')}
        className="absolute size-full"
      />
      <SafeAreaView className="android:pt-[2.3125rem] flex-1">
        {children}
      </SafeAreaView>

      <BottomSheet
        snapPoints={['70%']}
        ref={bottomSheetRef}
        enablePanDownToClose
        index={-1}
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
        <BottomSheetView className="h-full flex-grow bg-background-tertiary p-6">
          {bottomSheetContent}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default LayoutWrapper;
