import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPageContolValue } from '../store/page-control';
import Checklists from './checklists';
import IntroCard from './intro-card';

const Start = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View className="gap-8">
        <IntroCard />
        <Checklists />
      </View>
      <View className="gap-4">
        <Button
          label={'Start verification'}
          onPress={() => dispatch(setPageContolValue(1))}
        />
        <TextCustom className="text-center text-[10px]/[130%] text-custom-text-tertiary">
          You can continue browsing markets without verification.
        </TextCustom>
      </View>
    </>
  );
};

export default Start;
