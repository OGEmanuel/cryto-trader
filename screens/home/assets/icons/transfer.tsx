import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TransferIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.2793 10.4498L20.9993 6.72974L17.2793 3.00977"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 6.72949H21"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.71997 13.5498L3 17.2698L6.71997 20.9898"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 17.2695H3"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TransferIcon;
