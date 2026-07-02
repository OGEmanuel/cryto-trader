import RevampedWrapper from '@/components/revamped-wrapper';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ChartInterval } from '@/services/constants/types';
import {
  useGetAssetsSymbolQuery,
  useGetCandlesQuery,
} from '@/services/markets';
import { useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import ErrorState from '../components/error';
import { getIsPositive } from '../lib/utils';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '1d'] as const;

const TradesScreen = () => {
  const [width, setWidth] = useState(0);
  const [interval, setInterval] = useState<ChartInterval>('1m');
  const router = useRouter();

  const { data, isError, isLoading, refetch } = useGetAssetsSymbolQuery({
    symbol: 'BTC',
  });

  const {
    data: candleData,
    isError: isCandleError,
    isLoading: isCandleLoading,
    refetch: refetchCandles,
  } = useGetCandlesQuery({
    symbol: 'BTC',
    interval,
    limit: '50',
  });

  const coinCandleData = useMemo(() => {
    if (candleData?.data) {
      return candleData.data.map((item: any) => {
        return {
          timestamp: item.time,
          open: item.openUsd,
          high: item.highUsd,
          low: item.lowUsd,
          close: item.closeUsd,
        };
      });
    }
    return [];
  }, [candleData?.data]);

  return (
    <RevampedWrapper
      header="Trade"
      description="Buy, sell, or swap with quotes that expire before execution."
    >
      <View className="gap-9 pt-[18px]">
        {isError ? (
          <ErrorState message="Error fetching info" refetch={refetch} />
        ) : (
          <View className="gap-2 rounded-[18px] bg-background-tertiary py-5">
            <TextCustom className="px-5 font-nm-bold text-sm/[130%] text-custom-text-secondary">
              BTC / USDT
            </TextCustom>
            <View className="gap-5">
              <Skeleton.Group show={isLoading}>
                <View className="flex-row items-center gap-10 px-5">
                  <Skeleton width={140} height={32}>
                    <TextCustom className="font-nm-bold text-2xl/[130%] text-custom-text-secondary">
                      {data?.data.priceUsd.toLocaleString()}
                    </TextCustom>
                  </Skeleton>

                  <Skeleton width={70} height={18}>
                    <TextCustom
                      className={cn(
                        'font-nm-medium text-sm/[130%]',
                        getIsPositive(data?.data.change24h!!)
                          ? 'text-primary-2'
                          : 'text-destructive-2',
                      )}
                    >
                      {getIsPositive(data?.data.change24h!!) ? '+' : null}
                      {data?.data.change24h.toLocaleString()}%
                    </TextCustom>
                  </Skeleton>
                </View>
              </Skeleton.Group>
              <View className="gap-5">
                {isCandleLoading ? (
                  <View className="px-5">
                    <Skeleton width="100%" height={120} radius={12} />
                  </View>
                ) : isCandleError ? (
                  <ErrorState
                    message="Error fetching chart"
                    refetch={refetchCandles}
                  />
                ) : (
                  <View
                    onLayout={e => setWidth(e.nativeEvent.layout.width)}
                    className="w-full"
                  >
                    {width > 0 && (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        <CandlestickChart.Provider data={coinCandleData}>
                          <CandlestickChart width={width * 2} height={120}>
                            <CandlestickChart.Candles />
                          </CandlestickChart>
                        </CandlestickChart.Provider>
                      </ScrollView>
                    )}
                  </View>
                )}
                <View className="flex-row justify-between px-5">
                  {TIMEFRAMES.map(time => (
                    <Pressable
                      onPress={() => (setInterval(time), refetchCandles())}
                      key={time}
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      className="active:opacity-75"
                    >
                      <TextCustom
                        className={cn(
                          'text-sm/[130%] text-custom-text-tertiary',
                          time === interval && 'text-primary-2',
                        )}
                      >
                        {time}
                      </TextCustom>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        <View className="gap-[22px]">
          <TradeCard
            onPress={() => router.push('/home/trades/buy')}
            title="Buy crypto"
            description="Pay USDT and receive BTC"
            action="Buy"
          />
          <TradeCard
            onPress={() => router.push('/home/trades/sell')}
            title="Sell crypto"
            description="Sell ETH or BTC back to USDT"
            action="Sell"
          />
          <TradeCard
            onPress={() => router.push('/home/trades/swap')}
            title="Swap assets"
            description="Convert between supported coins"
            action="Swap"
          />
        </View>
      </View>
    </RevampedWrapper>
  );
};

export default TradesScreen;

const TradeCard = (props: {
  title: string;
  description: string;
  action: string;
  onPress: () => void;
}) => {
  const { title, description, action, onPress } = props;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl bg-background-tertiary p-5 active:opacity-75"
    >
      <View className="flex-row items-center gap-[10px]">
        <View
          className={cn(
            'size-9 rounded-full bg-primary-2',
            action.toLowerCase() === 'sell' && 'bg-destructive-2',
          )}
        />
        <View className="gap-[6px]">
          <TextCustom className="font-nm-bold leading-[130%] text-custom-text-secondary">
            {title}
          </TextCustom>
          <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
            {description}
          </TextCustom>
        </View>
      </View>
      <TextCustom
        className={cn(
          'text-sm/[130%] font-medium text-primary-2',
          action.toLowerCase() === 'sell' && 'text-destructive-2',
        )}
      >
        {action}
      </TextCustom>
    </Pressable>
  );
};
