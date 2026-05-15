import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PayIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.55542 7.77771H10.3376C10.951 7.77771 11.4488 8.33771 11.4488 8.88882C11.4488 9.50215 10.951 9.99993 10.3376 9.99993H7.55542V7.77771Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.55542 10H10.7288C11.431 10 11.9999 10.4978 11.9999 11.1111C11.9999 11.7244 11.431 12.2222 10.7288 12.2222H7.55542V10Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.11975 12.2222V13.3333"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.11975 6.66663V7.77774"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.61329 7.77771H6.66663"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.61329 12.2222H6.66663"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.98 19.88C13.88 21.15 15.35 21.98 17.03 21.98C19.76 21.98 21.98 19.76 21.98 17.03C21.98 15.37 21.16 13.9 19.91 13"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PayIcon;
