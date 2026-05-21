import Svg, { Path } from 'react-native-svg';

const BottomLeftIcon = (props: { className?: string }) => {
  const { className } = props;

  return (
    <Svg
      className={className}
      width="36"
      height="32"
      viewBox="0 0 36 32"
      fill="none"
    >
      <Path d="M4 0H0L0 32H36V27.5H4L4 0Z" fill="white" />
    </Svg>
  );
};

export default BottomLeftIcon;
