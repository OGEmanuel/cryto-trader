import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import ItemCard from '../../components/item-card';
import SuccessSymbol from '../../components/success-symbol';

const Success = () => {
  const router = useRouter();
  const details = useSelector(
    (state: RootState) => state.transactionControl.value,
  );

  return (
    <View className="flex-1 pt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-[3.375rem] pb-40"
      >
        <View className="gap-7">
          <SuccessSymbol />
          <TextCustom className="text-center font-nm-bold text-[22px]/[130%] text-custom-text-secondary">
            {details.data.transaction.toAmount.toFixed(5)}{' '}
            {details.data.transaction.toAsset} received
          </TextCustom>
        </View>
        <View className="gap-2">
          <ItemCard
            name="Reference"
            value={details.data.transaction.reference}
          />
          <ItemCard
            name="Paid"
            value={`${details.data.transaction.fromAmount.toFixed(2)} ${details.data.transaction.fromAsset}`}
          />
          <ItemCard
            name="Received"
            value={`${details.data.transaction.toAmount} ${details.data.transaction.toAsset}`}
          />
          <ItemCard
            name="Fee"
            value={`${details.data.transaction.feeAmount} ${details.data.transaction.fromAsset}`}
          />
          <ItemCard
            name="Status"
            value={details.data.transaction.status}
            className="capitalize text-primary-2"
          />
        </View>
        <Button label="View transaction" onPress={() => router.push('/home')} />
      </ScrollView>
    </View>
  );
};

export default Success;
