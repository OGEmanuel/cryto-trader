import TextCustom from '@/components/ui/text';
import NoticeIcon from '@/screens/kyc/attention/assets/icons/notice-icon.svg';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ChecklistItemCard from '../components/checklist-item-card';
import CircleIndicator from '../components/circle-indicator';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const Attention = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View className="gap-14">
        <View className="gap-7">
          <CircleIndicator className="bg-destructive-2/[14%]">
            <NoticeIcon />
          </CircleIndicator>
          <TextCustom className="text-center font-nm-bold text-2xl/[130%] text-custom-text-secondary">
            Try again
          </TextCustom>
        </View>
        <View className="gap-11">
          <View className="gap-3 rounded-2xl bg-background-tertiary p-6">
            <TextCustom className="text-custom-text-tertiary">
              Reason
            </TextCustom>
            <TextCustom className="text-lg/[130%] text-custom-text-secondary">
              Document photo was blurry. Upload a clearer image with all corners
              visible.
            </TextCustom>
          </View>
          <ChecklistItemCard title="Current level" status="Starter" />
        </View>
      </View>
      <Cta
        label={'Resubmit documents'}
        className="bg-destructive-2"
        labelClassName="text-custom-extra"
        onPress={() => dispatch(setPageContolValue(3))}
      />
    </>
  );
};

export default Attention;
