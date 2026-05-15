import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const OrdersIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 19H16C18 19 19 18 19 16V8C19 6 18 5 16 5H8C6 5 5 6 5 8V16C5 18 6 19 8 19Z"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 9.5H7.48C8.86 9.5 9.98 10.62 9.98 12C9.98 13.38 8.86 14.5 7.48 14.5H5"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 9.98999H16"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 14H16"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.20032 12H7.30032"
        stroke="#777777"
        strokeWidth="2"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default OrdersIcon;
