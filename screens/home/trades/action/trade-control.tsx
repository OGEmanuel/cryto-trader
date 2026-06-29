import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';

const TradeControlCard = (props: {
  children: React.ReactNode;
  action: string;
  position: 'top' | 'bottom';
}) => {
  const { children, action, position } = props;

  return (
    <View className="flex-row items-center justify-between rounded-[18px] bg-background-tertiary px-[1.375rem] py-[1.125rem]">
      <View className="gap-4">
        <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
          {action === 'buy'
            ? position === 'top'
              ? 'You pay'
              : 'You receive'
            : action === 'sell'
              ? position === 'top'
                ? 'You sell'
                : 'You receive'
              : position === 'top'
                ? 'from'
                : 'to'}
        </TextCustom>
        {children}
      </View>
      <View className="h-[2.125rem] w-[5.125rem] flex-row items-center justify-between gap-2 rounded-2xl bg-background-3 p-2">
        <View
          className={cn(
            'size-5 rounded-full bg-primary-2',
            action === 'sell' && position === 'top' && 'bg-destructive-2',
          )}
        />
        <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
          USDT
        </TextCustom>
      </View>
    </View>
  );
};

export default TradeControlCard;
