import TextCustom from '@/components/ui/text';
import CheckCircle from '@/screens/kyc/selfie/assets/icons/check-circle.svg';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import CircleIndicator from '../components/circle-indicator';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const Selfie = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View className="gap-[6.4375rem]">
        <CircleIndicator text="Face match" />
        <View className="gap-4">
          <ChecklistCard label="Good lighting" />
          <ChecklistCard label="No sunglasses or masks" />
          <ChecklistCard label="Use your own document" />
        </View>
      </View>
      <Cta
        label="Upload selfie"
        onPress={() => dispatch(setPageContolValue(5))}
      />
    </>
  );
};

export default Selfie;

const ChecklistCard = (props: { label: string }) => {
  const { label } = props;

  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-background-tertiary p-3">
      <CheckCircle />
      <TextCustom className="text-custom-extra">{label}</TextCustom>
    </View>
  );
};
