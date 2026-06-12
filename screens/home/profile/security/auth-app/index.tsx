import RevampedWrapper from '@/screens/home/components/revamped-wrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import SecurityCard from '../components/security-card';
import AuthAppForm from './form';

const AuthAppScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <RevampedWrapper
      header="Set up 2FA"
      description="Scan the code, then enter your authenticator code."
      canGoBack
      bottomSheetRef={bottomSheetRef}
      bottomSheetContent={<AuthAppForm onClose={() => handleClosePress()} />}
    >
      <View className="gap-11 pt-10">
        <View className="items-center">
          <View className="size-[160px] items-center justify-center rounded-2xl bg-white">
            <QRCode
              value="n2e5dirgMNYdQskfiP5zj39VYemXareK4C"
              color="black"
              backgroundColor="white"
              size={120}
            />
          </View>
        </View>
        <View className="gap-4">
          <SecurityCard name="Secret" value="JBSW Y3DP EHPK 3PXP" />
          <SecurityCard
            name="Authenticator code"
            value="Enter Code"
            valueClassName="text-custom-extra/60"
            onPress={() => handleOpenPress()}
          />
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default AuthAppScreen;
