import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const RecoveryCodesScreen = () => {
  const value = useSelector((state: RootState) => state.recovery.value);
  const exportCodes = async () => {
    try {
      const content = value.map(item => JSON.stringify(item)).join('\n');

      const file = new File(Paths.document, 'recovery-codes.txt');

      if (!file.exists) {
        file.create();
      }

      file.write(content);

      await Sharing.shareAsync(file.uri);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to export file. Please try again!',
      });
    }
  };

  const RenderCodes = (props: { code: string }) => {
    const { code } = props;

    return (
      <View className="flex-1 rounded-xl bg-background-tertiary py-4">
        <TextCustom className="text-center font-nm-medium text-xs/[130%] text-custom-text-secondary">
          {code}
        </TextCustom>
      </View>
    );
  };

  return (
    <RevampedWrapper
      header="Recovery codes"
      description="Save these once. Each code can only be used one time."
      goBackTo={'/home/profile/security'}
    >
      <View className="gap-60 pt-7">
        <View className="gap-10">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={value}
            horizontal={false}
            numColumns={2}
            renderItem={item => <RenderCodes code={item.item} />}
            contentContainerClassName={cn('gap-4')}
            columnWrapperClassName="gap-[10px]"
            keyExtractor={item => item}
          />
          <View className="gap-[10px] rounded-[18px] bg-warning-2 px-5 py-3">
            <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
              Press the button below to Download
            </TextCustom>
            <TextCustom className="max-w-[18.125rem] text-xs/[130%] text-warning-3">
              You won't be able to access this page after now!
            </TextCustom>
          </View>
        </View>
        <Button
          label="Download codes"
          onPress={exportCodes}
          className="bg-background"
          labelClassName="text-custom-extra font-nm-bold"
        />
      </View>
    </RevampedWrapper>
  );
};

export default RecoveryCodesScreen;
