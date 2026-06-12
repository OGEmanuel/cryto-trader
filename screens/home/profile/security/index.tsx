import TextCustom from '@/components/ui/text';
import { Href, useRouter } from 'expo-router';
import { View } from 'react-native';
import RevampedWrapper from '../../components/revamped-wrapper';
import OptionsCard from '../components/options-card';

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
    more: 'On',
  },
  {
    id: 3,
    title: 'Recovery codes',
    description: '8 backup codes remaining',
    more: 'View',
    link: '/home/profile/security/recovery-codes' as Href,
  },
  {
    id: 4,
    title: 'Registered devices',
    description: 'iPhone 15 Pro · push enabled',
    more: '2',
    link: '/home/profile/security/devices' as Href,
  },
  {
    id: 5,
    title: 'Biometric login',
    description: 'Face ID enabled on this device',
    more: 'On',
  },
];

const SecurityScreen = () => {
  const router = useRouter();
  return (
    <RevampedWrapper
      header="Security"
      description="Protect account access and sensitive actions."
      canGoBack
    >
      <View className="gap-11 pt-5">
        <View className="gap-3">
          {OPTIONS_LIST.map(list => (
            <OptionsCard
              key={list.id}
              description={list.description}
              title={list.title}
              more={list.more}
              onPress={() => list.link && router.push(list.link)}
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
