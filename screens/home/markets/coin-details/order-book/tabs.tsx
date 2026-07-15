import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';

const Tabs = (props: {
  active: 'orderbook' | 'trades';
  onSetActive: React.Dispatch<React.SetStateAction<'orderbook' | 'trades'>>;
}) => {
  const { active, onSetActive } = props;

  return (
    <View className="flex-row gap-[1.125rem]">
      <Pressable
        onPress={() => onSetActive('orderbook')}
        className={cn(
          'h-[1.875rem] w-[5.875rem] items-center justify-center rounded-2xl active:opacity-75',
          active === 'orderbook' ? 'bg-primary-2' : 'bg-background-3',
        )}
      >
        <TextCustom
          className={cn(
            'font-nm-medium text-xs/[130%]',
            active === 'orderbook'
              ? 'text-custom-text-3'
              : 'text-custom-text-secondary',
          )}
        >
          Order book
        </TextCustom>
      </Pressable>
      <Pressable
        onPress={() => onSetActive('trades')}
        className={cn(
          'h-[1.875rem] w-[4.5rem] items-center justify-center rounded-2xl active:opacity-75',
          active === 'trades' ? 'bg-primary-2' : 'bg-background-3',
        )}
      >
        <TextCustom
          className={cn(
            'font-nm-medium text-xs/[130%]',
            active === 'trades'
              ? 'text-custom-text-3'
              : 'text-custom-text-secondary',
          )}
        >
          Trades
        </TextCustom>
      </Pressable>
    </View>
  );
};

export default Tabs;
