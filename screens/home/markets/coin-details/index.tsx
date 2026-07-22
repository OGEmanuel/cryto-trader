import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ChartInterval } from '@/services/constants/types';
import {
  useGetAssetsSymbolQuery,
  useGetCandlesQuery,
} from '@/services/markets';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { CandlestickChart } from 'react-native-wagmi-charts';
import ErrorState from '../../components/error';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '1d'] as const;

export function formatCurrency(value: number): string {
  const units = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' },
  ];

  for (const unit of units) {
    if (Math.abs(value) >= unit.value) {
      const formatted = (value / unit.value).toFixed(1).replace(/\.0$/, '');

      return `${formatted}${unit.suffix}`;
    }
  }

  return `${value.toLocaleString()}`;
}

const CoinDetailsScreen = () => {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [interval, setInterval] = useState<ChartInterval>('1m');

  const { data, isLoading } = useGetAssetsSymbolQuery({
    symbol: symbol,
  });
  const {
    data: candleData,
    isError: isCandleError,
    isLoading: isCandleLoading,
    refetch: refetchCandles,
  } = useGetCandlesQuery({
    symbol: symbol,
    interval,
    limit: '50',
  });
  const isNegative = data?.data.change24h?.toString().startsWith('-');
  const svgUri = `${process.env.EXPO_PUBLIC_API_URL}${data?.data.iconUrl.slice(1)}`;

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
      header={isLoading ? '' : data?.data.name!!}
      description={
        isLoading ? '' : `${data?.data.symbol} · ${data?.data.network}`
      }
      onGoBackTo={() => router.push('/home/markets')}
    >
      <View className="gap-8 pt-6">
        <View className="gap-4">
          <View className="size-[2.625rem] items-center justify-center rounded-full bg-primary">
            <SvgUri width={42} height={42} uri={svgUri} />
          </View>
          <View className="flex-row items-center justify-between">
            <TextCustom className="font-nm-bold text-[2rem]/[130%] text-custom-text-secondary">
              ${data?.data.priceUsd.toLocaleString()}
            </TextCustom>
            <TextCustom
              className={cn(
                'font-nm-medium leading-[130%]',
                !isNegative ? 'text-primary-2' : 'text-destructive-2',
              )}
            >
              {!isNegative ? '+' : null}
              {data?.data.change24h.toLocaleString()}% 24h
            </TextCustom>
          </View>
        </View>
        <ScrollView
          contentContainerClassName="gap-8 pb-[14rem]"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-8">
            <View className="gap-[10px] rounded-[20px] bg-background-tertiary p-4">
              <Pressable
                onPress={() => router.push('/home/markets/BTC/order-book')}
                className="gap-2 active:opacity-75"
              >
                <View className="flex-row items-center justify-between">
                  <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-tertiary">
                    {data?.data.symbol} / USD
                  </TextCustom>
                  <TextCustom className="font-nm-medium leading-[130%] text-custom-text-secondary">
                    ${data?.data.priceUsd.toLocaleString()}
                  </TextCustom>
                </View>
                <View className="flex-row items-center justify-between">
                  <TextCustom className="text-xs/[130%] text-tertiary-3">
                    {interval === '1m'
                      ? '1 minute'
                      : interval === '15m'
                        ? '15 minutes'
                        : interval === '1d'
                          ? '1 day'
                          : interval === '1h'
                            ? '1 hour'
                            : '5 minutes'}{' '}
                    · simulated candles
                  </TextCustom>
                  <TextCustom className="font-nm-medium text-xs/[130%] text-primary-2">
                    {!isNegative ? '+' : null}
                    {data?.data.change24h.toLocaleString()}%
                  </TextCustom>
                </View>
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
                          <CandlestickChart width={width * 2} height={90}>
                            <CandlestickChart.Candles />
                          </CandlestickChart>
                        </CandlestickChart.Provider>
                      </ScrollView>
                    )}
                  </View>
                )}
              </Pressable>
              <View className="flex-row justify-between px-5">
                {TIMEFRAMES.map(time => (
                  <Pressable
                    onPress={() => (setInterval(time), refetchCandles())}
                    key={time}
                    className={cn(
                      'h-6 w-12 items-center justify-center rounded-xl active:opacity-75',
                      time === interval
                        ? 'bg-background-secondary-4'
                        : 'bg-background-4/[85%]',
                    )}
                  >
                    <TextCustom
                      className={cn(
                        'font-nm-medium text-xs/[130%] uppercase text-custom-text-tertiary',
                        time === interval && 'text-primary-2',
                      )}
                    >
                      {time}
                    </TextCustom>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="gap-4">
              <Button
                label="Buy"
                onPress={() =>
                  router.push({
                    pathname: '/home/trades/[action]',
                    params: { action: 'buy', coin: symbol },
                  })
                }
              />
              <View className="flex-row items-center gap-4">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/home/trades/[action]',
                      params: { action: 'sell', coin: symbol },
                    })
                  }
                  className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75"
                >
                  <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
                    Sell
                  </TextCustom>
                </Pressable>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/home/trades/[action]',
                      params: { action: 'swap', coin: symbol },
                    })
                  }
                  className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75"
                >
                  <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
                    Swap
                  </TextCustom>
                </Pressable>
                <Pressable
                  onPress={() => router.push('/home/markets/BTC/alerts')}
                  className="h-12 flex-1 items-center justify-center rounded-[14px] bg-background-3 active:opacity-75"
                >
                  <TextCustom className="font-nm-medium text-sm/[130%] text-primary-2">
                    Alert
                  </TextCustom>
                </Pressable>
              </View>
            </View>
          </View>
          <Skeleton.Group show={isLoading}>
            <View className="gap-4">
              <View className="flex-row gap-[1.125rem]">
                <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
                  <Skeleton width={72} height={12}>
                    <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                      Market cap
                    </TextCustom>
                  </Skeleton>
                  <Skeleton width={90} height={16}>
                    <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                      ${formatCurrency(data?.data.stats.marketCapUsd!!)}
                    </TextCustom>
                  </Skeleton>
                </View>
                <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
                  <Skeleton width={72} height={12}>
                    <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                      24h volume
                    </TextCustom>
                  </Skeleton>
                  <Skeleton width={90} height={16}>
                    <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                      ${formatCurrency(data?.data.stats.volume24hUsd!!)}
                    </TextCustom>
                  </Skeleton>
                </View>
              </View>
              <View className="flex-row gap-[1.125rem]">
                <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
                  <Skeleton width={72} height={12}>
                    <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                      24h high
                    </TextCustom>
                  </Skeleton>
                  <Skeleton width={90} height={16}>
                    <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                      ${formatCurrency(data?.data.stats.high24hUsd!!)}
                    </TextCustom>
                  </Skeleton>
                </View>
                <View className="flex-1 gap-6 rounded-[14px] bg-background-tertiary p-3">
                  <Skeleton width={72} height={12}>
                    <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                      Circulating
                    </TextCustom>
                  </Skeleton>
                  <Skeleton width={90} height={16}>
                    <TextCustom className="self-end font-nm-medium leading-[130%] text-custom-text-secondary">
                      {formatCurrency(data?.data.stats.circulatingSupply!!)}{' '}
                      {symbol}
                    </TextCustom>
                  </Skeleton>
                </View>
              </View>
            </View>
          </Skeleton.Group>
        </ScrollView>
      </View>
    </RevampedWrapper>
  );
};

export default CoinDetailsScreen;
