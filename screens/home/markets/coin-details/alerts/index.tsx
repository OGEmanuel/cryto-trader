import RevampedWrapper from '@/components/revamped-wrapper';
import TextCustom from '@/components/ui/text';
import ItemCard from '@/screens/home/components/item-card';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

const AlertScreen = () => {
  const router = useRouter();

  return (
    <RevampedWrapper
      header={'Create price alert'}
      description={'Get notified when BTC crosses your target.'}
      onGoBackTo={() => router.push('/home/markets/BTC')}
    >
      <View className="gap-12 pt-8">
        <View className="flex-row items-center justify-between rounded-[18px] bg-background-tertiary px-4 py-6">
          <View className="flex-row items-center gap-3">
            <View className="size-[2.625rem] rounded-full bg-warning-4" />
            <View className="gap-2">
              <TextCustom className="font-nm-bold text-xl/[130%] text-custom-text-secondary">
                BTC
              </TextCustom>
              <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
                Bitcoin
              </TextCustom>
            </View>
          </View>
          <TextCustom className="font-nm-medium leading-[130%] text-custom-text-secondary">
            $64,200.50
          </TextCustom>
        </View>
        <View className="gap-11">
          <View className="gap-8">
            <View className="flex-row items-center gap-5">
              <Pressable className="h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl bg-primary-2 active:opacity-75">
                <TextCustom className="font-nm-medium text-xs/[130%] text-custom-text-3">
                  Above
                </TextCustom>
              </Pressable>
              <Pressable className="h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl bg-background-3 active:opacity-75">
                <TextCustom className="font-nm-medium text-xs/[130%] text-custom-text-secondary">
                  Below
                </TextCustom>
              </Pressable>
            </View>
            <View className="gap-3 rounded-[18px] bg-background-tertiary p-6">
              <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
                Target price
              </TextCustom>
              <View className="flex-row items-end justify-between">
                <TextCustom className="font-nm-bold text-2xl/[130%] text-custom-text-secondary">
                  72,000
                </TextCustom>
                <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-tertiary">
                  USD
                </TextCustom>
              </View>
            </View>
          </View>
          <View className="gap-3">
            <ItemCard name="Trigger" value="BTC above $72,000" />
            <ItemCard
              name="Status"
              value="Active after creation"
              className="text-primary-2"
            />
          </View>
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default AlertScreen;
