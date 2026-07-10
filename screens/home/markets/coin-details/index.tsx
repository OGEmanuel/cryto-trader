import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { Pressable, View } from 'react-native';

const CoinDetailsScreen = () => {
  return (
    <RevampedWrapper header={'Bitcoin'} description={'BTC · Bitcoin network'}>
      <View className="gap-8 pt-6">
        <View className="gap-4">
          <View className="size-[2.625rem] items-center justify-center rounded-full bg-primary">
            <TextCustom>B</TextCustom>
          </View>
          <View className="flex-row items-center justify-between">
            <TextCustom className="font-nm-bold text-[2rem]/[130%] text-custom-text-secondary">
              $64,200.50
            </TextCustom>
            <TextCustom className="font-nm-medium leading-[130%] text-primary-2">
              +2.1% 24h
            </TextCustom>
          </View>
        </View>
        <View className="gap-8">
          <View className="gap-2 rounded-[20px] bg-background-tertiary p-4">
            <View className="flex-row items-center justify-between">
              <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-tertiary">
                BTC / USD
              </TextCustom>
              <TextCustom className="font-nm-medium leading-[130%] text-custom-text-secondary">
                $64,200.50
              </TextCustom>
            </View>
            <View className="flex-row items-center justify-between">
              <TextCustom className="text-tertiary-3 text-xs/[130%]">
                1 week · simulated candles
              </TextCustom>
              <TextCustom className="font-nm-medium text-xs/[130%] text-primary-2">
                +2.1%
              </TextCustom>
            </View>
          </View>
          <View className="gap-4">
            <Button label="Buy" onPress={() => console.log('trade')} />
            <View className="flex-row items-center gap-4">
              <Pressable className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75">
                <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
                  Sell
                </TextCustom>
              </Pressable>
              <Pressable className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75">
                <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
                  Swap
                </TextCustom>
              </Pressable>
              <Pressable className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75">
                <TextCustom className="font-nm-medium text-sm/[130%] text-primary-2">
                  Alert
                </TextCustom>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="gap-4">
          <View className="flex-row gap-[1.125rem]">
            <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                Market cap
              </TextCustom>
              <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                $1.26T
              </TextCustom>
            </View>
            <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                24h volume
              </TextCustom>
              <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                $47.0B
              </TextCustom>
            </View>
          </View>
          <View className="flex-row gap-[1.125rem]">
            <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                24h high
              </TextCustom>
              <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                $65,742
              </TextCustom>
            </View>
            <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                Circulating
              </TextCustom>
              <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                19.7M BTC
              </TextCustom>
            </View>
          </View>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default CoinDetailsScreen;
