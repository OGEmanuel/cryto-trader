import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import FailedIcon from '@/screens/home/trades/assets/icons/failed-icon.svg';
import CircleIndicator from '@/screens/kyc/components/circle-indicator';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ItemCard from '../../components/item-card';

const Failed = () => {
  const router = useRouter();
  const details = useSelector(
    (state: RootState) => state.transactionControl.value,
  );

  const findCoinInWallet = (symbol: string) => {
    return details.data.wallet.balances.find(
      (item: any) => item.assetSymbol === symbol,
    );
  };

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
              <ItemCard
                name="Required"
                value={`${details.data.transaction.toAmount.toFixed(4)} ${details.data.transaction.toAsset}`}
              />
              <ItemCard
                name="Available"
                value={`  ${findCoinInWallet(details.data.transaction.fromAsset)?.available} ${
                  details.data.transaction.fromAsset
                }`}
                className="text-destructive-2"
              />
              <ItemCard
                name="Status"
                value={details.data.transaction.status}
                className="capitalize text-destructive-2"
              />
            </View>
            <Button
              label="Edit amount"
              className="bg-destructive-2"
              labelClassName="text-custom-text-secondary"
              onPress={() =>
                router.replace(`/home/trades/${details.data.transaction.type}`)
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Failed;
