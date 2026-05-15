import { StyleProp, ViewStyle } from 'react-native';

export type CoinListType = {
  id: number;
  price: string;
  coin: React.ReactNode;
  pair: string;
  percentage: string;
};

export type IconActionType = {
  id: number;
  name: string;
  icon: (props: { style?: StyleProp<ViewStyle> }) => React.JSX.Element;
};
