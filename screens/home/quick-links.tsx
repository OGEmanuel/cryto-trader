import TextCustom from '@/components/ui/text';
import RocketIcon from '@/screens/home/assets/icons/rocket.svg';
import { Image, Pressable, View } from 'react-native';
import ArrowIcon from './assets/icons/arrow-right.svg';
import CreditCardIcon from './assets/icons/credit-card.svg';

const QUICK_LINKS = [
  {
    id: 1,
    name: 'P2P Trading',
    description: 'Bank Transfer, Paypal Revolut...',
    icon: <RocketIcon />,
  },
  {
    id: 2,
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard',
    icon: <CreditCardIcon />,
  },
];

const QuickLinks = () => {
  return (
    <View className="gap-[8.34px] px-6 pt-5">
      {QUICK_LINKS.map(link => (
        <View
          key={link.id}
          className="bg-extra/50 flex-row items-center justify-between rounded-2xl p-3"
        >
          <View className="flex-row items-center gap-4">
            <View className="relative size-[3.25rem]">
              <Image
                source={require('./assets/img/icon-bg.png')}
                className="size-full"
              />
              <View className="absolute">{link.icon}</View>
            </View>
            <View className="gap-2">
              <TextCustom className="text-base/[100%] text-background">
                {link.name}
              </TextCustom>
              <TextCustom className="text-sm/[100%] text-custom-text-2">
                {link.description}
              </TextCustom>
            </View>
          </View>
          <Pressable className="bg-extra size-10 items-center justify-center rounded-2xl active:opacity-75">
            <ArrowIcon />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default QuickLinks;
