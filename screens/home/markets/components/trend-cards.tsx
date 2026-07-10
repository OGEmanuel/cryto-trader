import TextCustom from '@/components/ui/text';
import { Pressable, View } from 'react-native';

export const TopGainer = () => {
  return (
    <View className="bg-background-secondary-2 gap-4 rounded-[18px] p-6">
      <View className="flex-row items-center justify-between">
        <TextCustom className="text-primary-3 font-nm-medium text-xs/[130%]">
          TOP GAINER · 24H
        </TextCustom>
        <TextCustom className="text-primary-4 font-nm-medium text-sm/[130%]">
          $152.00
        </TextCustom>
      </View>
      <View className="flex-row justify-between">
        <View className="gap-2">
          <View className="gap-2">
            <TextCustom className="font-nm-bold text-[22px]/[130%] text-custom-text-secondary">
              Solana
            </TextCustom>
            <TextCustom className="text-primary-5 font-nm-medium text-sm/[130%]">
              Highest 24h move
            </TextCustom>
          </View>
          <Pressable className="bg-background-secondary-3 w-[4.875rem] rounded-[11px] py-[6px] active:opacity-75">
            <TextCustom className="text-primary-4 text-center font-nm-medium text-xs/[130%]">
              View Asset
            </TextCustom>
          </Pressable>
        </View>
        <View>
          <TextCustom className="font-nm-bold text-sm/[130%] text-primary-2">
            +4.2%
          </TextCustom>
        </View>
      </View>
    </View>
  );
};

export const MarketPulse = () => {
  return (
    <View className="rounded-[20px] bg-background-tertiary p-4">
      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <TextCustom className="font-nm-medium text-xs/[130%] text-custom-text-tertiary">
            Market pulse
          </TextCustom>
          <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
            +2.8% avg
          </TextCustom>
        </View>
        <View className="flex-row items-center justify-between">
          <TextCustom className="text-tertiary-3 text-xs/[130%]">
            Simulated live feed
          </TextCustom>
          <TextCustom className="font-nm-medium text-sm/[130%] text-primary-2">
            Refreshing
          </TextCustom>
        </View>
      </View>
    </View>
  );
};
