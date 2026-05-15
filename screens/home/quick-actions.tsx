import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { StyleProp, View, ViewStyle } from 'react-native';
import DepositIcon from './assets/icons/deposit';
import GridTradingIcon from './assets/icons/grid-trading';
import LaunchPadIcon from './assets/icons/launch-pad';
import LiquidSwapIcon from './assets/icons/liquid-swap';
import MarginIcon from './assets/icons/margin';
import MoreIcon from './assets/icons/more';
import ReferralIcon from './assets/icons/referral';
import SavingsIcon from './assets/icons/savings';
import PressableIconLabel from './components/pressable-icon-label';

const ACTIONS = [
  {
    id: 1,
    name: 'Deposit',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <DepositIcon {...props} />
    ),
  },
  {
    id: 2,
    name: 'Referral',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <ReferralIcon {...props} />
    ),
  },
  {
    id: 3,
    name: 'Grid Trading',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <GridTradingIcon {...props} />
    ),
  },
  {
    id: 4,
    name: 'Margin',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <MarginIcon {...props} />
    ),
  },
  {
    id: 5,
    name: 'Launchpad',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <LaunchPadIcon {...props} />
    ),
  },
  {
    id: 6,
    name: 'Savings',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <SavingsIcon {...props} />
    ),
  },
  {
    id: 7,
    name: 'Liquid Swap',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <LiquidSwapIcon {...props} />
    ),
  },
  {
    id: 8,
    name: 'More',
    icon: (props: { style?: StyleProp<ViewStyle> }) => <MoreIcon {...props} />,
  },
];

const QuickActions = () => {
  const router = useRouter();

  return (
    <View className="bg-background-2">
      <View className="flex-row border-b-[0.5px] border-tertiary">
        {ACTIONS.slice(0, 4).map(action => (
          <PressableIconLabel
            key={action.id}
            action={action}
            className={cn(
              'border-r border-tertiary pb-4',
              action.id === 4 && 'border-0',
            )}
          />
        ))}
      </View>
      <View className="flex-row border-t-[0.5px] border-tertiary">
        {ACTIONS.slice(4, 8).map(action => (
          <PressableIconLabel
            key={action.id}
            action={action}
            onPress={() => {
              if (action.name.toLowerCase() === 'more') {
                router.push('/home/more');
              }
            }}
            className={cn(
              'border-r border-tertiary pb-4',
              action.id === 4 && 'border-0',
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
