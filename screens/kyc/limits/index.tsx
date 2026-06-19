import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
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
      <View className="gap-4">
        <Button
          label={'Continue'}
          onPress={() => dispatch(setPageContolValue(2))}
        />
        <TextCustom className="text-center text-[10px]/[130%] text-custom-text-tertiary" />
      </View>
    </>
  );
};

export default Limits;
