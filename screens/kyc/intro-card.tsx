import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const IntroCard = () => {
  return (
    <View className="relative items-center rounded-[18px] bg-background-tertiary py-6">
      <View className="absolute top-[18px] size-[5.75rem] rounded-full bg-background-secondary">
        <TextCustom className="pt-2 text-center font-nm-medium text-xs/[130%] text-primary">
          Level 0
        </TextCustom>
      </View>
      <View className="w-full max-w-[16.625rem] gap-4 pt-10">
        <TextCustom className="text-center font-nm-bold text-[22px]/[130%] text-custom-text-secondary">
          Starter account
        </TextCustom>
        <TextCustom className="text-center text-xs/[130%] text-custom-text-tertiary">
          Browse markets now. Verify to trade, withdraw, and raise sandbox
          deposit limits.
        </TextCustom>
      </View>
    </View>
  );
};

export default IntroCard;
