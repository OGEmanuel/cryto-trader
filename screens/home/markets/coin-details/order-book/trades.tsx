import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { FlatList, View } from 'react-native';

const Trades = [
  { id: 1, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
  { id: 2, price: 64193.57, units: 0.015, amount: 963.09, type: 'sell' },
  { id: 3, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
  { id: 4, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
  { id: 5, price: 64193.57, units: 0.015, amount: 963.09, type: 'sell' },
  { id: 6, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
  { id: 7, price: 64193.57, units: 0.015, amount: 963.09, type: 'sell' },
  { id: 8, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
  { id: 9, price: 64193.57, units: 0.015, amount: 963.09, type: 'buy' },
] as const;

const TradesList = () => {
  const RenderTrade = (props: {
    trade: {
      id: number;
      price: number;
      units: number;
      amount: number;
      type: 'buy' | 'sell';
    };
  }) => {
    const { trade } = props;
    return (
      <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary p-5">
        <TextCustom
          className={cn(
            'font-nm-medium text-sm/[130%] capitalize',
            trade.type === 'buy' ? 'text-primary-2' : 'text-destructive-2',
          )}
        >
          {trade.type}
        </TextCustom>
        <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
          {trade.price}
        </TextCustom>
        <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
          {trade.units}
        </TextCustom>
        <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
          {trade.amount}
        </TextCustom>
      </View>
    );
  };

  return (
    <View className="h-[37rem]">
      <FlatList
        data={Trades}
        renderItem={item => <RenderTrade trade={item.item} />}
        contentContainerClassName="gap-4"
      />
    </View>
  );
};

export default TradesList;
