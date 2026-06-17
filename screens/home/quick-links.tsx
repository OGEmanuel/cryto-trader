import TextCustom from '@/components/ui/text';
import RocketIcon from '@/screens/home/assets/icons/rocket.svg';
import { Link } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import ArrowIcon from './assets/icons/arrow-right.svg';

const QuickLinks = () => {
  return (
    <View className="px-6 pt-5">
      <Link href={'/kyc'} asChild>
        <Pressable className="flex-row items-center justify-between rounded-2xl bg-extra/50 p-3 active:opacity-75">
          <View className="flex-row items-center gap-4">
            <View className="relative size-[3.25rem]">
              <Image
                source={require('./assets/img/icon-bg.png')}
                className="size-full"
              />
              <View className="absolute">
                <RocketIcon />
              </View>
            </View>
            <View className="gap-2">
              <TextCustom className="font-nm-medium text-base/[100%] text-background">
                Verify to trade
              </TextCustom>
              <TextCustom className="max-w-[15.625rem] text-sm/[100%] text-custom-tertiary">
                Trading and withdrawals are locked until your identity is
                approved.
              </TextCustom>
            </View>
          </View>
          <View className="size-10 items-center justify-center rounded-2xl bg-extra">
            <ArrowIcon />
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default QuickLinks;
