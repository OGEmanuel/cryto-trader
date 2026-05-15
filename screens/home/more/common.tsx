import { cn } from '@/lib/utils';
import { StyleProp, View, ViewStyle } from 'react-native';
import DepositIcon from '../assets/icons/deposit';
import OrdersIcon from '../assets/icons/orders';
import ReferralIcon from '../assets/icons/referral';
import TransferIcon from '../assets/icons/transfer';
import PressableIconLabel from '../components/pressable-icon-label';
import Section from './components/section';

const ACTIONS = [
  {
    id: 1,
    name: 'Transfer',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <TransferIcon {...props} />
    ),
  },
  {
    id: 2,
    name: 'Deposit',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <DepositIcon {...props} />
    ),
  },
  {
    id: 3,
    name: 'Orders',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <OrdersIcon {...props} />
    ),
  },
  {
    id: 4,
    name: 'Referral',
    icon: (props: { style?: StyleProp<ViewStyle> }) => (
      <ReferralIcon {...props} />
    ),
  },
];

const Common = () => {
  return (
    <Section title="Common">
      <View className="flex-row items-center justify-between">
        {ACTIONS.map(action => (
          <PressableIconLabel
            key={action.id}
            action={action}
            className={cn('gap-1 pt-4')}
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
    </Section>
  );
};

export default Common;
