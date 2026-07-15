import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import ItemCard from '@/screens/home/components/item-card';
import { FlatList, View } from 'react-native';

const Orders = [
  { price: 64193.57, amount: 0.03 },
  { price: 64193.55, amount: 0.03 },
  { price: 64193.56, amount: 0.03 },
  { price: 64193.23, amount: 0.03 },
  { price: 64193.13, amount: 0.03 },
  { price: 64193.91, amount: 0.03 },
  { price: 64193.01, amount: 0.03 },
  { price: 64193.12, amount: 0.03 },
  { price: 64193.28, amount: 0.03 },
  { price: 64193.73, amount: 0.03 },
  { price: 64193.91, amount: 0.03 },
  { price: 64193.08, amount: 0.03 },
  { price: 64193.51, amount: 0.03 },
];

const Order = () => {
  const RenderOrder = (props: {
    order: { price: number; amount: number };
    type: 'bid' | 'ask';
  }) => {
    const { order, type } = props;
    return (
      <View className="flex-row justify-between">
        <TextCustom
          className={cn(
            'text-sm/[130%]',
            type === 'bid' ? 'text-primary-2' : 'text-destructive-2',
          )}
        >
          {order.price}
        </TextCustom>
        <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
          {order.amount}
        </TextCustom>
      </View>
    );
  };

  return (
    <View className="gap-7">
      <View className="gap-3">
        <ItemCard name="Mid price" value="$64,200.50" />
        <ItemCard name="Spread" value="$13.86" />
      </View>
      <View className="gap-10">
        <View className="h-72 flex-row gap-8 px-3">
          <View className="flex-1 gap-6">
            <TextCustom className="font-nm-bold leading-[130%] text-primary-2">
              Bids
            </TextCustom>
            <FlatList
              data={Orders}
              renderItem={item => <RenderOrder order={item.item} type="bid" />}
              contentContainerClassName="gap-7"
              keyExtractor={item => item.price.toString()}
            />
          </View>
          <View className="flex-1 gap-6">
            <TextCustom className="font-nm-bold leading-[130%] text-destructive-2">
              Asks
            </TextCustom>
            <FlatList
              data={Orders}
              renderItem={item => <RenderOrder order={item.item} type="ask" />}
              contentContainerClassName="gap-7"
              keyExtractor={item => item.price.toString()}
            />
          </View>
        </View>
        <Button label="Trade BTC" onPress={() => console.log('trade')} />
      </View>
    </View>
  );
};

export default Order;
