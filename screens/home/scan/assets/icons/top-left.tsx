import Svg, { Path } from 'react-native-svg';

const TopLeftIcon = (props: { className?: string }) => {
  const { className } = props;

  return (
    <Svg
      className={className}
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
    >
      <Path d="M32 4V0H0V36H4.5V4H32Z" fill="white" />
    </Svg>
  );
};

export default TopLeftIcon;
