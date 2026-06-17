import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import RevampedWrapper from '@/components/revamped-wrapper';
import AssetsList from './list';
import MarketTabs from './tabs';

const MarketsScreen = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<'All' | 'Gainers' | 'Watchlist'>('All');

  const handleChange = (value: string) => {
    setSearch(value);
  };

  return (
    <RevampedWrapper
      header="Market"
      description="Search assets, view live prices, and open a coin detail screen."
    >
      <View className="flex-1 gap-6 pt-3">
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
        <AssetsList active={active} search={search} />
      </View>
    </RevampedWrapper>
  );
};

export default MarketsScreen;
