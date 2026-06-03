import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';

const TABS = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Gainers' },
  { id: 3, name: 'Watchlist' },
] as const;

const MarketTabs = (props: {
  active: 'All' | 'Gainers' | 'Watchlist';
  onSetActive: React.Dispatch<
    React.SetStateAction<'All' | 'Gainers' | 'Watchlist'>
  >;
}) => {
  const { active, onSetActive } = props;

  return (
    <View className="flex-row items-center gap-3">
      {TABS.map(tab => (
        <Pressable
          key={tab.id}
          onPress={() => onSetActive(tab.name)}
          className={cn(
            'h-[30px] items-center justify-center rounded-2xl px-8 active:opacity-75',
            active === tab.name ? 'bg-primary-2' : 'bg-background-3',
          )}
        >
          <TextCustom
            className={cn(
              'font-nm-medium text-[10px]/[130%]',
              active === tab.name
                ? 'text-custom-text-3'
                : 'text-custom-text-secondary',
            )}
          >
            {tab.name}
          </TextCustom>
        </Pressable>
      ))}
    </View>
  );
};

export default MarketTabs;
