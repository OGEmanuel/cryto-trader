import { cn } from '@/lib/utils';
import { StyleProp, View, ViewStyle } from 'react-native';
import ConvertIcon from '../assets/icons/convert';
import GridTradingIcon from '../assets/icons/grid-trading';
import LiquidSwapIcon from '../assets/icons/liquid-swap';
import MarginIcon from '../assets/icons/margin';
import SpotIcon from '../assets/icons/spot';
import PressableIconLabel from '../components/pressable-icon-label';
import Section from './components/section';
import { isMoreThanOneWord } from './lib/utils';

const ACTIONS = [
  {
    id: 1,
    name: 'Convert',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <ConvertIcon {...props} />
    ),
  },
  {
    id: 2,
    name: 'Spot',
    icon: (props: { style?: StyleProp<ViewStyle> }) => <SpotIcon {...props} />,
  },
  {
    id: 3,
    name: 'Margin',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <MarginIcon {...props} />
    ),
  },
  {
    id: 4,
    name: 'Grid Trading',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <GridTradingIcon {...props} />
    ),
  },
  {
    id: 5,
    name: 'Liquid Swap',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <LiquidSwapIcon {...props} />
    ),
  },
];

const Trade = () => {
  return (
    <Section title="Trade">
      <View className="gap-[3.375rem]">
        <View className="flex-row items-start justify-between">
          {ACTIONS.slice(0, 4).map(action => (
            <PressableIconLabel
              key={action.id}
              action={action}
              className={cn('gap-1 pt-4')}
              isMoreThanOneWord={() => isMoreThanOneWord(action.name)}
            >
              {action.icon({
                style: {
                  shadowColor: '#5ED5A8',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                },
              })}
            </PressableIconLabel>
          ))}
        </View>
        <View className="mx-3 w-[5rem] flex-row">
          <PressableIconLabel
            action={ACTIONS[4]}
            className={cn('items-center gap-1 pt-4')}
            isMoreThanOneWord={() => isMoreThanOneWord(ACTIONS[4].name)}
          >
            {ACTIONS[4].icon({
              style: {
                shadowColor: '#5ED5A8',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 5,
              },
            })}
          </PressableIconLabel>
        </View>
      </View>
    </Section>
  );
};

export default Trade;
