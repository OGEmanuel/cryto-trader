import Svg, { Path } from 'react-native-svg';

const BottomRightIcon = (props: { className?: string }) => {
  const { className } = props;

  return (
    <Svg
      className={className}
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
    >
      <Path d="M0 32V36H32V0H27.5V32H0Z" fill="white" />
    </Svg>
  );
};

export default BottomRightIcon;
