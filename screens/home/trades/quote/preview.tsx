import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { useGetQuoteDetailsQuery } from '@/services/trade';
import { useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import ItemCard from '../../components/item-card';

const formatTime = (seconds: number | null) => {
  if (seconds === null) return '00:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds,
  ).padStart(2, '0')}`;
};

const Preview = (props: {
  id: string;
  onSetIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { id, onSetIsExpired } = props;
  const { data, isLoading } = useGetQuoteDetailsQuery({
    quoteId: id,
  });
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    setTimer(data?.data.expiresInSeconds ?? null);
  }, [data?.data.expiresInSeconds]);

  useEffect(() => {
    if (timer === 0) {
      onSetIsExpired(true);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === null) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer !== null]);

  return (
    <Skeleton.Group show={isLoading}>
      <View className="pt-7">
        <View className="gap-8">
          {/* Expires in */}
          <View className="flex-row items-center justify-between rounded-[18px] bg-background-secondary p-7">
            <Skeleton width={70} height={14}>
              <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
                Expires in
              </TextCustom>
            </Skeleton>

            <Skeleton width={80} height={28}>
              <TextCustom className="font-nm-bold text-[22px]/[130%] text-primary-2">
                {formatTime(timer)}
              </TextCustom>
            </Skeleton>
          </View>

          <View className="gap-10">
            <View className="gap-[10px]">
              <ItemCard
                name="From"
                isLoading={isLoading}
                value={`${data?.data.fromAmount} ${data?.data.fromAsset}`}
              />
              <ItemCard
                name="To"
                isLoading={isLoading}
                value={`${data?.data.toAmount} ${data?.data.toAsset}`}
              />
              <ItemCard
                name="Rate"
                isLoading={isLoading}
                value={`1 ${data?.data.fromAsset} = ${data?.data.rate} ${data?.data.toAsset}`}
              />
              <ItemCard
                name="Fee"
                isLoading={isLoading}
                value={`${data?.data.feeAmount} ${data?.data.fromAsset}`}
              />
              <ItemCard
                name="Estimated receive"
                isLoading={isLoading}
                value={`${((data?.data.fromAmount!! - data?.data.feeAmount!!) * data?.data.rate!!).toFixed(4)} ${data?.data.toAsset}`}
                className="text-primary-2"
              />
            </View>

            <Skeleton width="100%" height={56} radius={16}>
              <Button
                label="Confirm with PIN"
                onPress={() =>
                  router.push({
                    pathname: '/home/trades/confirm',
                    params: { id: id },
                  })
                }
              />
            </Skeleton>
          </View>
        </View>
      </View>
    </Skeleton.Group>
  );
};

export default Preview;
