import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Cta from '../components/cta';
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
      <Cta
        label="Start verification"
        footNote="You can continue browsing markets without verification."
        onPress={() => dispatch(setPageContolValue(1))}
      />
    </>
  );
};

export default Start;
