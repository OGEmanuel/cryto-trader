import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';
import Steps from './steps';

const Limits = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View className="gap-14">
        <Steps />
        <View className="rounded-2xl bg-background-tertiary p-6">
          <TextCustom className="leading-[130%] text-custom-text-secondary">
            Verification is required before executing quotes or requesting
            withdrawals.
          </TextCustom>
        </View>
      </View>
      <Cta label="Continue" onPress={() => dispatch(setPageContolValue(2))} />
    </>
  );
};

export default Limits;
