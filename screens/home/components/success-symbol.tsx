import CheckIcon from '@/assets/icons/check-icon.svg';
import CircleIndicator from '@/screens/kyc/components/circle-indicator';

const SuccessSymbol = () => {
  return (
    <CircleIndicator floatingCircleClassName="bg-primary-2">
      <CheckIcon />
    </CircleIndicator>
  );
};

export default SuccessSymbol;
