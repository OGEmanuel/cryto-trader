import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomLeftShape from '../assets/icons/bl-shape.svg';
import TopRightShape from '../assets/icons/tr-shape.svg';

const RevampedWrapper = (props: {
  children: React.ReactNode;
  header: string;
  description: string;
}) => {
  const { children, header, description } = props;

  return (
    <View className="bg-background-secondary relative flex-1">
      <View className="absolute right-0 top-0">
        <TopRightShape />
      </View>
      <SafeAreaView className="android:mt-12 flex-1 px-6">
        <View className="gap-[14px]">
          <TextCustom className="text-custom-text-secondary font-nm-bold text-2xl/[130%]">
            {header}
          </TextCustom>
          <TextCustom className="text-custom-text-tertiary w-[20.375rem] text-xs/[130%]">
            {description}
          </TextCustom>
        </View>
        {children}
      </SafeAreaView>
      <View className="absolute bottom-0 left-0">
        <BottomLeftShape />
      </View>
    </View>
  );
};

export default RevampedWrapper;
