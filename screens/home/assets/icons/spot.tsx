import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SpotIcon = (props: { style?: StyleProp<ViewStyle> }) => {
  const { style } = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.0001 13.4301C13.7233 13.4301 15.1201 12.0332 15.1201 10.3101C15.1201 8.58694 13.7233 7.19006 12.0001 7.19006C10.277 7.19006 8.88013 8.58694 8.88013 10.3101C8.88013 12.0332 10.277 13.4301 12.0001 13.4301Z"
        stroke="#777777"
        strokeWidth="1.5"
      />
      <Path
        d="M3.61983 8.49C5.58983 -0.169998 18.4198 -0.159997 20.3798 8.5C21.5298 13.58 18.3698 17.88 15.5998 20.54C13.5898 22.48 10.4098 22.48 8.38983 20.54C5.62983 17.88 2.46983 13.57 3.61983 8.49Z"
        stroke="#5ED5A8"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default SpotIcon;
