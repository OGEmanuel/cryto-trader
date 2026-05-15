import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PoolIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.88013 18.15V16.08"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M12 18.15V14.01"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M17.1199 18.1501V11.9301"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M17.1201 5.84998L16.6601 6.38998C14.1101 9.36998 10.6901 11.48 6.88013 12.43"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M14.1901 5.84998H17.1201V8.76998"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="#3E474F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PoolIcon;
