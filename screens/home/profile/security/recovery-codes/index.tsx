import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import RevampedWrapper from '@/screens/home/components/revamped-wrapper';
import { FlatList, View } from 'react-native';

const CODES = [
  { code: 'CRT-2800' },
  { code: 'CRT-2937' },
  { code: 'CRT-3074' },
  { code: 'CRT-3211' },
  { code: 'CRT-3348' },
  { code: 'CRT-3485' },
  { code: 'CRT-3622' },
  { code: 'CRT-3759' },
];

const RecoveryCodesScreen = () => {
  const RenderCodes = (props: { codes: { code: string } }) => {
    const { codes } = props;

    return (
      <View className="flex-1 rounded-xl bg-background-tertiary py-4">
        <TextCustom className="text-center font-nm-medium text-xs/[130%] text-custom-text-secondary">
          {codes.code}
        </TextCustom>
      </View>
    );
  };

  return (
    <RevampedWrapper
      header="Recovery codes"
      description="Save these once. Each code can only be used one time."
      canGoBack
    >
      <View className="gap-80 pt-7">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={CODES}
          horizontal={false}
          numColumns={2}
          renderItem={item => <RenderCodes codes={item.item} />}
          contentContainerClassName={cn('gap-4')}
          columnWrapperClassName="gap-[10px]"
          keyExtractor={item => item.code}
        />
        <Button
          label="Regenerate codes"
          className="bg-background"
          labelClassName="text-custom-extra font-nm-bold"
        />
      </View>
    </RevampedWrapper>
  );
};

export default RecoveryCodesScreen;
