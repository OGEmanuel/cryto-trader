import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const EthIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.4499 3.04994L6.7099 7.70994C5.8599 8.76994 6.1599 10.1299 7.3699 10.7299L11.0999 12.5999C11.5899 12.8399 12.3899 12.8399 12.8799 12.5999L16.6099 10.7299C17.8199 10.1199 18.1199 8.75994 17.2699 7.70994L13.5399 3.04994C12.6999 1.97994 11.2999 1.97994 10.4499 3.04994Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2.29993V7.55993"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.79993 10.7099L11.9999 7.55994L16.1999 10.7099"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.76999 14.4299L10.38 15.1499C11.41 15.6099 12.59 15.6099 13.63 15.1499L15.24 14.4299C16.68 13.7899 18.01 15.5299 17.01 16.7499L13.55 20.9799C12.7 22.0199 11.31 22.0199 10.45 20.9799L6.99999 16.7499C5.98999 15.5299 7.31999 13.7899 8.76999 14.4299Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EthIcon;
