import RevampedWrapper from '@/components/revamped-wrapper';
import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

const data = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11,
  },
  {
    timestamp: 1625946300000,
    open: 33545.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
];

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '1d'] as const;

const TradesScreen = () => {
  const [width, setWidth] = useState(0);
  const router = useRouter();

  return (
    <RevampedWrapper
      header="Trade"
      description="Buy, sell, or swap with quotes that expire before execution."
    >
      <View className="gap-9 pt-[18px]">
        <View className="gap-2 rounded-[18px] bg-background-tertiary p-5">
          <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
            BTC / USDT
          </TextCustom>
          <View className="gap-5">
            <View className="flex-row items-center gap-10">
              <TextCustom className="font-nm-bold text-2xl/[130%] text-custom-text-secondary">
                64,200.50
              </TextCustom>
              <TextCustom className="font-nm-medium text-sm/[130%] text-primary-2">
                +2.1%
              </TextCustom>
            </View>
            <View className="gap-5">
              <View
                onLayout={e => setWidth(e.nativeEvent.layout.width)}
                className="w-full"
              >
                {width > 0 && (
                  <CandlestickChart.Provider data={data}>
                    <CandlestickChart width={width} height={120}>
                      <CandlestickChart.Candles />
                    </CandlestickChart>
                  </CandlestickChart.Provider>
                )}
              </View>
              <View className="flex-row justify-between">
                {TIMEFRAMES.map(time => (
                  <TextCustom
                    key={time}
                    className="text-sm/[130%] text-custom-text-tertiary"
                  >
                    {time}
                  </TextCustom>
                ))}
              </View>
            </View>
          </View>
        </View>
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
