import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import {
  useGetAssetsQuery,
  useGetAssetsSymbolQuery,
  useGetTrendingQuery,
} from '@/services/markets';
import { useGetWatchlistQuery } from '@/services/profile';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { LineChart } from 'react-native-wagmi-charts';
import { Asset } from '../constants/types';

const AssetsList = (props: {
  active: 'All' | 'Gainers' | 'Watchlist';
  search: string;
}) => {
  const { active, search } = props;
  const insets = useSafeAreaInsets();
  const [displayedAssets, setDisplayedAssets] = useState<Asset[] | undefined>(
    [],
  );
  const { data } = useGetAssetsQuery({});
  const { data: trendingData } = useGetTrendingQuery({});
  const { data: watchlistData } = useGetWatchlistQuery({});

  const query = search.trim().toLowerCase();

  const filteredSearch = displayedAssets?.filter(asset =>
    [asset.name, asset.symbol].some(value =>
      value.trim().toLowerCase().includes(query),
    ),
  );

  useEffect(() => {
    if (active === 'All') {
      setDisplayedAssets(data?.data);
    } else if (active === 'Gainers') {
      setDisplayedAssets(trendingData?.data);
    } else {
      setDisplayedAssets(watchlistData?.data);
    }
  }, [active, data, trendingData, watchlistData]);

  const RenderAssetsList = (props: { coinList: Asset }) => {
    const { coinList } = props;
    const isPositive = !coinList.change24h?.toString().startsWith('-');
    const svgUri = `${process.env.EXPO_PUBLIC_API_URL}${coinList.iconUrl.slice(1)}`;
    const router = useRouter();
    const { data } = useGetAssetsSymbolQuery({
      symbol: coinList.symbol,
    });

    const coinLineData = useMemo(() => {
      if (data?.data) {
        return data.data.chart.slice(0, 7).map((item: any) => {
          return {
            timestamp: new Date(item.time).getTime(),
            value: item.priceUsd,
          };
        });
      }
      return [];
    }, [data?.data]);

    return (
      <Pressable
        onPress={() => router.push(`/home/markets/${coinList.symbol}`)}
        className="flex-row items-center justify-between rounded-2xl bg-background-tertiary p-4 active:opacity-75"
      >
        <View className="flex-row items-center gap-8">
          <View className="w-28 flex-row items-center gap-[10px]">
            <View className="size-9 rounded-full">
              <SvgUri width={36} height={36} uri={svgUri} />
            </View>
            <View className="gap-1">
              <TextCustom className="font-nm-bold text-sm/[130%] text-custom-text-secondary">
                {coinList.name}
              </TextCustom>
              <TextCustom className="text-xs/[130%] text-custom-text-tertiary">
                {coinList.symbol}
              </TextCustom>
            </View>
          </View>
          <View>
            <LineChart.Provider data={coinLineData}>
              <LineChart width={58} height={26}>
                <LineChart.Path
                  color={
                    isPositive
                      ? Colors.light['primary-2']
                      : Colors.light['destructive-3']
                  }
                />
              </LineChart>
            </LineChart.Provider>
          </View>
        </View>
        <View className="items-end gap-1">
          <TextCustom className="font-nm-medium text-sm/[130%] text-custom-text-secondary">
            ${coinList.priceUsd}
          </TextCustom>
          <TextCustom
            className={cn(
              'font-nm-medium text-xs/[130%]',
              isPositive ? 'text-primary-2' : 'text-destructive-2',
            )}
          >
            {isPositive ? '+' : null}
            {coinList.change24h}%
          </TextCustom>
        </View>
      </Pressable>
    );
  };

  return (
    <View className={cn('flex-1')}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={search.trim() === '' ? displayedAssets : filteredSearch}
        renderItem={item => <RenderAssetsList coinList={item.item} />}
        contentContainerClassName={cn('gap-4')}
        contentContainerStyle={{
          paddingBottom:
            Platform.OS === 'android'
              ? insets.bottom + 112
              : insets.bottom + 44,
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AssetsList;
