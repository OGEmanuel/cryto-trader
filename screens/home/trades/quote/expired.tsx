import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import NoticeIcon from '@/screens/home/trades/assets/icons/notice-2-icon.svg';
import {
  useCreateTradeMutation,
  useGetQuoteDetailsQuery,
} from '@/services/trade';
import { useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import ItemCard from '../../components/item-card';

const Expired = (props: {
  id: string;
  onSetIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { id, onSetIsExpired } = props;
  const { data, isLoading } = useGetQuoteDetailsQuery({
    quoteId: id,
  });

  const [create, { isLoading: isCreating }] = useCreateTradeMutation();

  const handleCreate = async (values: {
    type: string;
    fromAsset: string;
    toAsset: string;
    fromAmount: number;
  }) => {
    try {
      const response = await create(values).unwrap();
      onSetIsExpired(false);
      router.push({
        pathname: '/home/trades/quote',
        params: { id: response.data.id },
      });
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: `Failed to ${data?.data.type}`,
        text2: message,
      });
    }
  };

  return (
    <Skeleton.Group show={isLoading}>
      <View className="gap-16 pt-11">
        <View className="items-center gap-[30px] rounded-[22px] bg-background-tertiary p-[18px]">
          <Skeleton width={88} height={88} radius="round">
            <View className="size-[5.5rem] items-center justify-center rounded-full bg-warning-4/[18%]">
              <NoticeIcon />
            </View>
          </Skeleton>
          <View className="gap-[14px]">
            <Skeleton width={220} height={24}>
              <TextCustom className="text-center font-nm-bold text-xl/[130%] text-custom-text-secondary">
                This quote is no longer valid
              </TextCustom>
            </Skeleton>
            <Skeleton width={250} height={14}>
              <TextCustom className="max-w-[17.625rem] text-center text-sm/[130%] text-custom-text-tertiary">
                Get a new quote so the rate, fee, and receive amount are
                current.
              </TextCustom>
            </Skeleton>
          </View>
        </View>
        <View className="gap-28">
          <View className="gap-3">
            <ItemCard
              isLoading={isLoading}
              name="Expired quote"
              value={data?.data.id!!}
            />
            <ItemCard
              isLoading={isLoading}
              name="Previous receive"
              value={`${((data?.data.fromAmount!! - data?.data.feeAmount!!) * data?.data.rate!!).toFixed(4)} ${data?.data.toAsset}`}
            />
          </View>
          <Button
            className="bg-warning-4"
            label="Get a new quote"
            isPending={isCreating}
            onPress={() =>
              handleCreate({
                type: data?.data.type!!,
                fromAsset: data?.data.fromAsset!!,
                toAsset: data?.data.toAsset!!,
                fromAmount: data?.data.fromAmount!!,
              })
            }
          />
        </View>
      </View>
    </Skeleton.Group>
  );
};

export default Expired;
