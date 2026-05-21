import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import CameraIcon from './assets/icons/camera';

const SectionHeader = () => {
  return (
    <View className="items-center">
      <View className="w-full max-w-[17rem] gap-1">
        <View className="flex-row items-center justify-center gap-[10px]">
          <CameraIcon />
          <TextCustom className="font-nm-bold text-lg/[100%] text-white">
            Scan QR code
          </TextCustom>
        </View>
        <TextCustom className="text-center text-sm/5 text-secondary">
          Scan the QR code and it automatically recognize it.
        </TextCustom>
      </View>
    </View>
  );
};

export default SectionHeader;
