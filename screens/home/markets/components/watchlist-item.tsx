import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

export const WatchlistItem = () => {
  return (
    <View className="gap-3 rounded-[18px] bg-background-tertiary p-6">
      <TextCustom className="font-nm-bold text-[18px]/[130%] text-custom-text-secondary">
        Add more assets
      </TextCustom>
      <TextCustom className="max-w-[15.625rem] text-sm/[130%] text-custom-text-tertiary">
        Use the market list to add coins to your watchlist.
      </TextCustom>
    </View>
  );
};
