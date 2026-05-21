import Svg, { Path } from 'react-native-svg';

const TopRightIcon = (props: { className?: string }) => {
  const { className } = props;
  return (
    <Svg
      className={className}
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
    >
      <Path d="M32 32H36V0L0 0V4.5L32 4.5V32Z" fill="white" />
    </Svg>
  );
};

export default TopRightIcon;
