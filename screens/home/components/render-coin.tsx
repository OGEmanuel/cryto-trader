import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import NegativeGraphIcon from '../assets/icons/graph-negative.svg';
import PositiveGraphIcon from '../assets/icons/graph-positive.svg';
import { CoinListType } from '../constants/types';

const RenderCoin = (props: { coinList: CoinListType }) => {
  const { coinList } = props;
  const isPositive = coinList.percentage.startsWith('+');

  return (
    <View
      className="w-[12rem] gap-4 rounded-2xl bg-white px-2 pb-3 pl-3 pt-2"
      style={{
        shadowColor: Colors.light['background-2'],
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowOpacity: 0.08,
        shadowRadius: 25,
        elevation: 16,
      }}
    >
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <TextCustom
            className={cn(
              'font-nm-bold text-base/6',
              isPositive ? 'text-primary' : 'text-destructive',
            )}
          >
            {coinList.price}
          </TextCustom>
          {coinList.coin}
        </View>
        <View className="flex-row items-center gap-1">
          <TextCustom className="text-sm/[100%] text-background">
            {coinList.pair}
          </TextCustom>
          <TextCustom
            className={cn(
              'text-xs/[100%]',
              isPositive ? 'text-primary' : 'text-destructive',
            )}
          >
            {coinList.percentage}
          </TextCustom>
        </View>
      </View>
      {isPositive ? <PositiveGraphIcon /> : <NegativeGraphIcon />}
    </View>
  );
};

export default RenderCoin;
