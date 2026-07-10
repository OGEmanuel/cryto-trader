import RevampedWrapper from '@/components/revamped-wrapper';
import Button from '@/components/ui/button';
import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { MarketPulse, TopGainer } from './components/trend-cards';
import { WatchlistItem } from './components/watchlist-item';
import AssetsList from './list';
import MarketTabs from './tabs';

const MARKET_HEADERS = [
  {
    header: 'Market',
    description:
      'Search assets, view live prices, and open a coin detail screen.',
  },
  {
    header: 'Trending',
    description: 'Top moving assets from the simulated market feed.',
  },
  {
    header: 'Watchlist',
    description: 'Assets you follow with row sparklines.',
  },
];

const MarketsScreen = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<'All' | 'Gainers' | 'Watchlist'>('All');

  const handleChange = (value: string) => {
    setSearch(value);
  };

  return (
    <RevampedWrapper
      header={
        MARKET_HEADERS[active === 'All' ? 0 : active === 'Watchlist' ? 2 : 1]
          .header
      }
      description={
        MARKET_HEADERS[active === 'All' ? 0 : active === 'Watchlist' ? 2 : 1]
          .description
      }
      onGoBackTo={active === 'All' ? undefined : () => setActive('All')}
    >
      <View className="flex-1 gap-6 pt-3">
        {active === 'All' && (
          <>
            <TextInput
              value={search}
              onChangeText={handleChange}
              placeholder="Search coin or symbol"
              placeholderTextColor={Colors.light['custom-text-tertiary']}
              className="h-12 rounded-[14px] bg-background-tertiary px-6 font-nm text-xs/[130%] text-custom-text-secondary"
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <MarketTabs active={active} onSetActive={setActive} />
          </>
        )}
        {active === 'Gainers' && (
          <View className="gap-5">
            <TopGainer />
            <MarketPulse />
          </View>
        )}
        <AssetsList active={active} search={search} />
        {active === 'Watchlist' && (
          <View className="gap-20 pb-40">
            <WatchlistItem />
            <Button label="Explore markets" onPress={() => setActive('All')} />
          </View>
        )}
      </View>
    </RevampedWrapper>
  );
};

export default MarketsScreen;
