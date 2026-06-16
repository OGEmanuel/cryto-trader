import TextCustom from '@/components/ui/text';
import RevampedWrapper from '@/screens/home/components/revamped-wrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { View } from 'react-native';
import SecurityCard from '../components/security-card';
import TransactionPinForm from './form';

const TransactionPinScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <RevampedWrapper
      header="Transaction PIN"
      description="Update the PIN used for trade and withdrawal confirmations."
      goBackTo={'/home/profile/security'}
      bottomSheetRef={bottomSheetRef}
      bottomSheetContent={
        <TransactionPinForm onClose={() => handleClosePress()} />
      }
    >
      <View className="flex-1 gap-9 pt-7">
        <View className="gap-4">
          <SecurityCard
            name="Current PIN"
            value="••••"
            onPress={() => handleOpenPress()}
          />
          <SecurityCard
            name="New PIN"
            value="••••"
            onPress={() => handleOpenPress()}
          />
          <SecurityCard
            name="Confirm PIN"
            value="••••"
            onPress={() => handleOpenPress()}
          />
        </View>
        <View className="gap-[10px] rounded-2xl bg-background-tertiary px-[18] py-[14px]">
          <TextCustom className="font-nm-bold text-sm/[130%] text-custom-extra">
            PIN rules
          </TextCustom>
          <TextCustom className="max-w-[18.125rem] text-xs/[130%] text-custom-text-tertiary">
            Use four digits. Avoid repeated or obvious numbers in production
            apps.
          </TextCustom>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default TransactionPinScreen;
