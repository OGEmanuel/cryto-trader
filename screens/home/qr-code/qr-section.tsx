import TextCustom from '@/components/ui/text';
import * as Clipboard from 'expo-clipboard';
import { Pressable, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CopyIcon from './assets/icons/copy-icon.svg';

const QrSection = () => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View className="items-center gap-5 py-5">
      <TextCustom className="text-center font-nm-bold text-lg/[100%] text-white">
        My QR code
      </TextCustom>
      <View className="size-[258px] items-center justify-center rounded-2xl bg-white">
        <QRCode
          value="n2e5dirgMNYdQskfiP5zj39VYemXareK4C"
          color="black"
          backgroundColor="white"
          size={200}
        />
      </View>
      <View className="gap-1">
        <TextCustom className="text-center text-sm/5 uppercase text-secondary">
          address
        </TextCustom>
        <View className="flex w-[20.8125rem] flex-row items-center overflow-hidden rounded-xl bg-background-2">
          <TextCustom className="px-3 font-nm-medium text-sm/[100%] text-secondary">
            n2e5dirgMNYdQskfiP5zj39VYemXareK4C
          </TextCustom>
          <Pressable
            onPress={() =>
              copyToClipboard('n2e5dirgMNYdQskfiP5zj39VYemXareK4C')
            }
            className="flex-1 items-center justify-center bg-white py-2"
          >
            <CopyIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default QrSection;
