import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ConvertIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.47 11.42L2.73 9.68005L1 11.42"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.53 12.5801L21.27 14.3201L23.01 12.5801"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.26 14.32V12C21.26 6.88 17.11 2.73999 12 2.73999C9.08002 2.73999 6.47002 4.10002 4.77002 6.21002"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.73999 9.68005V12.0001C2.73999 17.1201 6.88999 21.2601 12 21.2601C14.92 21.2601 17.53 19.9 19.23 17.79"
        stroke="#777777"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 8.5H13.38C14.35 8.5 15.13 9.38 15.13 10.25C15.13 11.22 14.35 12 13.38 12H9V8.5Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12H14C15.1 12 16 12.78 16 13.75C16 14.72 15.1 15.5 14 15.5H9V12Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.8 15.5V17.25"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.8 6.75V8.5"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ConvertIcon;
