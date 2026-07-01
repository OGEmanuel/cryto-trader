import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import FailedIcon from '@/screens/home/trades/assets/icons/failed-icon.svg';
import CircleIndicator from '@/screens/kyc/components/circle-indicator';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import ItemCard from '../../components/item-card';

const Failed = () => {
  const router = useRouter();

  return (
    <View className="pt-10">
      <View className="gap-7">
        <CircleIndicator className="bg-destructive-2/[16%]">
          <FailedIcon />
        </CircleIndicator>
        <View className="gap-[3.5rem]">
          <View className="items-center gap-[18px]">
            <TextCustom className="text-center font-nm-bold text-[22px]/[130%] text-custom-extra">
              Insufficient balance
            </TextCustom>
            <TextCustom className="max-w-[17.875rem] text-center text-sm/[130%] text-custom-text-tertiary">
              Your available USDT balance changed before the quote was executed.
            </TextCustom>
          </View>
          <View className="gap-16">
            <View className="gap-3">
              <ItemCard name="Required" value="250.00 USDT" />
              <ItemCard
                name="Available"
                value="124.00 USDT"
                className="text-destructive-2"
              />
              <ItemCard
                name="Status"
                value="Failed"
                className="text-destructive-2"
              />
            </View>
            <Button
              label="Edit amount"
              className="bg-destructive-2"
              labelClassName="text-custom-text-secondary"
              onPress={() => router.replace('/home/trades/buy')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Failed;
