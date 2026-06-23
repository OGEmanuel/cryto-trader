import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ChecklistItemCard from '../components/checklist-item-card';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const Submission = () => {
  const dispatch = useDispatch();
  return (
    <>
      <View className="gap-9">
        <View className="gap-[14px]">
          <ChecklistItemCard title="Legal name" status="Ada Student" />
          <ChecklistItemCard title="Country" status="Nigeria" />
          <ChecklistItemCard title="Document" status="National ID" />
          <ChecklistItemCard title="Document image" status="Uploaded" />
          <ChecklistItemCard title="Selfie image" status="Uploaded" />
        </View>
        <View className="rounded-2xl bg-background-tertiary p-5">
          <TextCustom className="text-custom-text-tertiary">
            After submission your status changes to pending and trade/withdraw
            remain locked until approved.
          </TextCustom>
        </View>
      </View>
      <Cta
        label={'Submit for review'}
        onPress={() => dispatch(setPageContolValue(6))}
      />
    </>
  );
};

export default Submission;
