import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import NoticeIcon from '@/screens/home/trades/assets/icons/notice-2-icon.svg';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import ItemCard from '../../components/item-card';

const Expired = () => {
  const router = useRouter();
  
  return (
    <View className="gap-16 pt-11">
      <View className="items-center gap-[30px] rounded-[22px] bg-background-tertiary p-[18px]">
        <View className="size-[5.5rem] items-center justify-center rounded-full bg-warning-4/[18%]">
          <NoticeIcon />
        </View>
        <View className="gap-[14px]">
          <TextCustom className="text-center font-nm-bold text-xl/[130%] text-custom-text-secondary">
            This quote is no longer valid
          </TextCustom>
          <TextCustom className="max-w-[17.625rem] text-center text-sm/[130%] text-custom-text-tertiary">
            Get a new quote so the rate, fee, and receive amount are current.
          </TextCustom>
        </View>
      </View>
      <View className="gap-28">
        <View className="gap-3">
          <ItemCard name="Expired quote" value="quote_abc123" />
          <ItemCard name="Previous receive" value="0.00384 BTC" />
        </View>
        <Button
          className="bg-warning-4"
          label="Get a new quote"
          onPress={() => router.push('/home/trades/confirm')}
        />
      </View>
    </View>
  );
};

export default Expired;
