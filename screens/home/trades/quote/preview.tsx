import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import ItemCard from '../../components/item-card';

const Preview = () => {
  const router = useRouter();

  return (
    <View className="pt-7">
      <View className="gap-8">
        <View className="flex-row items-center justify-between rounded-[18px] bg-background-secondary p-7">
          <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
            Expires in
          </TextCustom>
          <TextCustom className="font-nm-bold text-[22px]/[130%] text-primary-2">
            00:24
          </TextCustom>
        </View>
        <View className="gap-10">
          <View className="gap-[10px]">
            <ItemCard name="From" value="250.00 USDT" />
            <ItemCard name="To" value="0.00388 BTC" />
            <ItemCard name="Rate" value="1 BTC = 64,200.50 USDT" />
            <ItemCard name="Fee" value="2.50 USDT" />
            <ItemCard
              name="Estimated receive"
              value="0.00384 BTC"
              className="text-primary-2"
            />
          </View>
          <Button
            label="Confirm with PIN"
            onPress={() => router.push('/home/trades/confirm')}
          />
        </View>
      </View>
    </View>
  );
};

export default Preview;
