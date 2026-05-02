import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { getFullWidth } from '@/lib/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

const StepWrapper = (props: { children: React.ReactNode; title: string }) => {
  const { children, title } = props;
  return (
    <View
      className="items-center gap-3 pt-[5.8125rem]"
      style={{ width: getFullWidth() }}
    >
      <View className="relative">
        {children}
        <View className="absolute bottom-0 h-[9rem] w-full">
          <LinearGradient
            colors={['rgba(27, 35, 42, 0)', Colors.light.background]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="size-full"
            style={{ ...StyleSheet.absoluteFillObject }}
          />
        </View>
      </View>
      <View className="gap-6 p-6">
        <TextCustom className="text-center text-2xl/[100%] text-white">
          {title}
        </TextCustom>
        <TextCustom className="text-secondary text-center text-lg/7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </TextCustom>
      </View>
    </View>
  );
};

export default StepWrapper;
