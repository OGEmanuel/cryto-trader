import { cn } from '@/lib/utils';
import { StyleProp, View, ViewStyle } from 'react-native';
import CryptoLoansIcon from '../assets/icons/crypto-loans';
import EthIcon from '../assets/icons/eth';
import LaunchPadIcon from '../assets/icons/launch-pad';
import PayIcon from '../assets/icons/pay';
import PoolIcon from '../assets/icons/pool';
import SavingsIcon from '../assets/icons/savings';
import StakingIcon from '../assets/icons/staking';
import PressableIconLabel from '../components/pressable-icon-label';
import Section from './components/section';
import { isMoreThanOneWord } from './lib/utils';

const ACTIONS = [
  {
    id: 1,
    name: 'Savings',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <SavingsIcon {...props} />
    ),
  },
  {
    id: 2,
    name: 'Staking',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <StakingIcon {...props} />
    ),
  },
  {
    id: 3,
    name: 'Pay',
    icon: (props: { style?: StyleProp<ViewStyle> }) => <PayIcon {...props} />,
  },
  {
    id: 4,
    name: 'Crypto Loans',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <CryptoLoansIcon {...props} />
    ),
  },
  {
    id: 5,
    name: 'Pool',
    icon: (props: { style?: StyleProp<ViewStyle> }) => <PoolIcon {...props} />,
  },
  {
    id: 6,
    name: 'ETH 2.0',
    icon: (props: { style?: StyleProp<ViewStyle> }) => <EthIcon {...props} />,
  },
  {
    id: 7,
    name: 'Launchpad',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <LaunchPadIcon {...props} />
    ),
  },
  {
    id: 8,
    name: 'Launchpad',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <LaunchPadIcon {...props} />
    ),
  },
];

const Finance = () => {
  return (
    <Section title="Finance">
      <View className="gap-[3.375rem]">
        <View className="flex-row items-center justify-between">
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
        <View className="flex-row items-center justify-between">
          {ACTIONS.slice(4, 8).map(action => (
            <PressableIconLabel
              key={action.id}
              action={action}
              className={cn('gap-1 pt-4', action.id === 8 && 'opacity-0')}
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
      </View>
    </Section>
  );
};

export default Finance;
