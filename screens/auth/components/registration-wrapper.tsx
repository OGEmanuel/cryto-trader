import TextCustom from '@/components/ui/text';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import ArrowIcon from '../../../assets/icons/arrow-icon.svg';
import LayoutWrapper from './layout-wrapper';

const RegistrationWrapper = (props: {
  title?: string;
  children: React.ReactNode;
}) => {
  const { title, children } = props;

  return (
    <LayoutWrapper>
      <View className="gap-[1.625rem] px-6">
        {title && (
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <View className="size-11 items-center justify-center">
              <ArrowIcon />
            </View>
            <TextCustom className="font-nm-bold text-lg/[100%] text-custom-text-2">
              {title}
            </TextCustom>
          </Pressable>
        )}
        {children}
      </View>
    </LayoutWrapper>
  );
};

export default RegistrationWrapper;
