import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ChecklistItemCard from '../components/checklist-item-card';
import CircleIndicator from '../components/circle-indicator';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const Review = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View className="gap-20">
        <View className="gap-5">
          <CircleIndicator
            text="•••"
            textClassName="text-warning-4"
            className="bg-warning-4/[18%]"
          />
          <View className="gap-5">
            <TextCustom className="text-center font-nm-bold text-2xl/[130%] text-custom-extra">
              Pending review
            </TextCustom>
            <TextCustom className="text-center text-custom-text-tertiary">
              You can browse markets while we review your documents. Trading and
              withdrawals stay locked.
            </TextCustom>
          </View>
        </View>
        <View className="gap-4">
          <ChecklistItemCard title="Current level" status="Review" />
          <ChecklistItemCard title="Sandbox deposit" status="$250 max" />
        </View>
      </View>
      <Cta
        label={'Back to home'}
        onPress={() => dispatch(setPageContolValue(7))}
      />
    </>
  );
};

export default Review;
