import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useSetup2faMutation } from '@/services/auth';
import { useGetCurrentProfileQuery } from '@/services/profile';
import BottomSheet from '@gorhom/bottom-sheet';
import { Href, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import RevampedWrapper from '../../components/revamped-wrapper';
import OptionsCard from '../components/options-card';
import Disable2fa from './components/disable-2fa';

const SecurityScreen = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();
  const { data, isError, isLoading } = useGetCurrentProfileQuery({});

  const [setup2fa, { isLoading: isSettingUp2fa }] = useSetup2faMutation();

  const handleSetup2fa = async () => {
    if (data?.data.twoFactorEnabled) {
      handleOpenPress();
      return;
    }
    try {
      const response = await setup2fa({}).unwrap();

      router.push({
        pathname: '/home/profile/security/auth-app',
        params: {
          secret: response.data.secret,
          otpauthUri: response.data.otpauthUri,
        },
      });
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Setup Failed',
        text2: message,
      });
    }
  };

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching user data',
        text2: 'Please try again!',
      });
    }
  }, [isError]);

  const OPTIONS_LIST = [
    {
      id: 1,
      title: 'Transaction PIN',
      description: 'Required for trades and withdrawals',
      link: '/home/profile/security/transaction-pin' as Href,
      more: 'Set',
    },
    {
      id: 2,
      title: 'Authenticator app',
      description: 'Enabled for login protection',
      link: '/home/profile/security/auth-app' as Href,
      more: data ? (data.data.twoFactorEnabled ? 'On' : 'Off') : 'off',
    },
    {
      id: 3,
      title: 'Registered devices',
      description: 'iPhone 15 Pro · push enabled',
      more: '2',
      link: '/home/profile/security/devices' as Href,
    },
    {
      id: 4,
      title: 'Biometric login',
      description: 'Face ID enabled on this device',
      more: 'On',
    },
  ];

  return (
    <RevampedWrapper
      header="Security"
      description="Protect account access and sensitive actions."
      goBackTo={'/home/profile'}
      bottomSheetRef={bottomSheetRef}
      bottomSheetContent={
        <Disable2fa bottomSheetClose={() => handleClosePress()} />
      }
    >
      <View className="gap-11 pt-5">
        <View className="gap-3">
          {OPTIONS_LIST.map(list => (
            <OptionsCard
              key={list.id}
              description={list.description}
              title={list.title}
              more={list.more}
              disabled={isError || isLoading || isSettingUp2fa}
              isLoading={isLoading}
              onPress={() =>
                list.title.toLowerCase().includes('authenticator')
                  ? handleSetup2fa()
                  : list.link && router.push(list.link)
              }
              indicatorClassName={cn(
                list.more.toLowerCase() === 'off' && 'bg-destructive-3',
              )}
              moreClassName={cn(
                list.more.toLowerCase() === 'off' && 'text-destructive-3',
              )}
            />
          ))}
        </View>
        <View className="gap-[10px] rounded-[18px] bg-warning-2 px-5 py-3">
          <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
            Admin will never ask for codes
          </TextCustom>
          <TextCustom className="max-w-[18.125rem] text-xs/[130%] text-warning-3">
            Keep recovery codes private and regenerate them if exposed.
          </TextCustom>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default SecurityScreen;
