import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import EmptyIcon from './assets/icons/empty-illustration.svg';

const EmptySection = () => {
  return (
    <View className="items-center gap-3 self-center">
      <EmptyIcon />
      <View>
        <TextCustom className="font-nm-bold text-sm/6 text-white">
          You have no notifications
        </TextCustom>
        <TextCustom className="font-nm-bold text-sm/6 text-secondary">
          lorem ipsum lorem ipsum
        </TextCustom>
      </View>
    </View>
  );
};

export default EmptySection;
