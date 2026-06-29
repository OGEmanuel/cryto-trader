import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

const Tabs = (props: { action: string }) => {
  const { action } = props;
  const router = useRouter();

  return (
    <View className="flex-row gap-2">
      <Pressable
        onPress={() => router.replace('/home/trades/buy')}
        className={cn(
          'h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl bg-background-3 active:opacity-75',
          action === 'buy' && 'bg-primary-2',
        )}
      >
        <TextCustom
          className={cn(
            'font-nm-medium text-xs/[130%] text-custom-text-secondary',
            action === 'buy' && 'text-custom-text-3',
          )}
        >
          Buy
        </TextCustom>
      </Pressable>
      <Pressable
        onPress={() => router.replace('/home/trades/sell')}
        className={cn(
          'h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl bg-background-3 active:opacity-75',
          action === 'sell' && 'bg-destructive-2',
        )}
      >
        <TextCustom className="font-nm-medium text-xs/[130%] text-custom-text-secondary">
          Sell
        </TextCustom>
      </Pressable>
      <Pressable
        onPress={() => router.replace('/home/trades/swap')}
        className={cn(
          'h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl bg-background-3 active:opacity-75',
          action === 'swap' && 'bg-primary-2',
        )}
      >
        <TextCustom
          className={cn(
            'font-nm-medium text-xs/[130%] text-custom-text-secondary',
            action === 'swap' && 'text-custom-text-3',
          )}
        >
          Swap
        </TextCustom>
      </Pressable>
    </View>
  );
};

export default Tabs;
